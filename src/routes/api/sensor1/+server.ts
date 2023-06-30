import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
  const data = await request.json();
  console.log(data);
  console.log(data.contextResponses);
  console.log(data.contextResponses[0].contextElement);
  console.log(data.contextResponses[0].contextElement.attributes);

  return json({});
};
