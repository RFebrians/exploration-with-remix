import { useCatch, Link, json, useLoaderData, Form, redirect } from "remix";
import type { LoaderFunction, MetaFunction, ActionFunction } from "remix";
import { supabase } from "~/db";

export let loader: LoaderFunction = async ({ params }) => {
  const table = supabase.from("feed");
  const { data, error } = await table.select().eq("id", params.id);

  if ((data && data?.length < 1) || error) {
    throw new Response("Not Found", { status: 404 });
  }

  return { param: params.id, data };
};

export const action: ActionFunction = async ({ request, params }) => {
  if (request.method !== "PATCH") return json({ status: 405 });
  const formData = await request.formData();
  const { data, error } = await supabase
    .from("feed")
    .update({
      title: formData.get("title"),
      description: formData.get("description"),
    })
    .match({ id: params.id });
  if (error) {
    return json(error, { status: 400 });
  }
  console.log(data);
  return redirect(`/feed/${params.id}`);
};

export default function ParamfeedhowDemo() {
  let data = useLoaderData();
  const feed = data.data[0];
  return (
    <div>
      <Link to="/feed">back to main menu</Link>
      <h2> Edit Section </h2>
      <h1>{JSON.stringify(feed, null, 2)}</h1>
      <Form method="patch">
        <input name="title" defaultValue={feed.title} />
        <br></br>
        <textarea name="description" defaultValue={feed.description} />
        <br></br>
        <button type="submit">submit</button>
      </Form>
    </div>
  );
}

// https://remix.run/api/conventions#catchboundary
// https://remix.run/api/remix#usecatch
// https://remix.run/api/guides/not-found
export function CatchBoundary() {
  let caught = useCatch();

  let message: React.ReactNode;
  switch (caught.status) {
    case 401:
      message = (
        <p>
          Looks like you tried to visit a page that you do not have access to.
          Maybe ask the webmaster ({caught.data.webmasterEmail}) for access.
        </p>
      );
    case 404:
      message = (
        <p>Looks like you tried to visit a page that does not exist.</p>
      );
    default:
      message = (
        <p>
          There was a problem with your request!
          <br />
          {caught.status} {caught.statusText}
        </p>
      );
  }

  return (
    <>
      <h2>Oops!</h2>
      <p>{message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

// https://remix.run/api/conventions#errorboundary
// https://remix.run/api/guides/not-found
export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);
  return (
    <>
      <h2>Error!</h2>
      <p>{error.message}</p>
      <p>
        (Isn't it cool that the user gets to stay in context and try a different
        link in the parts of the UI that didn't blow up?)
      </p>
    </>
  );
}

export let meta: MetaFunction = ({ data }) => {
  return {
    title: data ? `Param: ${data.param}` : "Oops...",
  };
};
