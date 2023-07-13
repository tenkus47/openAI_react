import type {  V2_MetaFunction,ActionFunction } from "@remix-run/node";
import { Form, useActionData } from '@remix-run/react'
import { Configuration, OpenAIApi } from 'openai'
export const meta: V2_MetaFunction = () => {
  return [
    { title: "OpenAi search" },
    { name: "description", content: "Welcome to Search anything!" },
  ];
};
export const action: ActionFunction = async( {request}) => {
  let formData = await request.formData();
  let search = formData.get("search") as string;
  let API = process.env.OPENAI_API_KEY;
  const configuration = new Configuration({ apiKey: API });
  const ai = new OpenAIApi(configuration); 
  const completion = await ai.createCompletion({
    model: "text-davinci-003",
    max_tokens: 512,
    temperature: 0,
    prompt: search,
  });
  return {text: completion.data.choices[0].text};
}


export default function Index() {

  const actionData = useActionData();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      {actionData && <div className="search-results">{actionData.text}</div>}
      <div className="search-engine">
        <Form method='POST' className="search-form">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </Form>
      </div>
    </div>
  );
}
