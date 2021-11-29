import { ActionFunction, redirect } from "remix";
import { json, Form } from "remix";
import { supabase } from "../../db";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const { data, error } = await supabase.from("feed").insert({
    title: formData.get("title"),
    description: formData.get("description"),
  });
  if (error) {
    return json(error, { status: 400 });
  }
  console.log(data);
  return redirect("/feed");
};

// https://remix.run/guides/routing#index-routes
export default function feedNew() {
  return (
    <div className="">
      new feed
      <Form method="post">
        <label>
          title:
          <input type="text" name="title" />
        </label>
        <label>
          description:
          <textarea name="description" />
        </label>
        <input type="submit" value="submit" />
      </Form>
    </div>
  );
}
