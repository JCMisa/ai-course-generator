const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const safetySetting = [
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
];

export const chatSession = model.startChat({
    generationConfig,
    safetySetting,
    history: [
        {
            role: "user",
            parts: [
                { text: "Generate a course tutorial on the following details, category with value of programming, topic with value of python, level with value of beginner, duration with value of 1 hour, and chapters which is 5, based on those properties I want additional property called course which has an object value with properties called name which is the name of the course, description which is the description of the course, chapters which is an array of objects and each object has properties called chapterName which is the name of the chapter, about which is what the chapter is all about, and duration which is the duration of the chapter, make it in JSON format." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n{\n  \"category\": \"programming\",\n  \"topic\": \"python\",\n  \"level\": \"beginner\",\n  \"duration\": \"1 hour\",\n  \"chapters\": 5,\n  \"course\": {\n    \"name\": \"Python for Beginners: A Hands-On Introduction\",\n    \"description\": \"This course provides a comprehensive introduction to Python programming, designed for absolute beginners. You'll learn the fundamentals of programming concepts, syntax, and data structures, and build practical skills through hands-on exercises.\",\n    \"chapters\": [\n      {\n        \"chapterName\": \"Introduction to Python\",\n        \"about\": \"This chapter covers the basics of Python programming, including its history, advantages, and how to set up your development environment.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapterName\": \"Variables, Data Types, and Operators\",\n        \"about\": \"Learn about different data types in Python, how to assign values to variables, and how to use operators to perform calculations.\",\n        \"duration\": \"20 minutes\"\n      },\n      {\n        \"chapterName\": \"Control Flow: Conditional Statements and Loops\",\n        \"about\": \"Understand how to control the flow of your programs using conditional statements (if, elif, else) and loops (for, while).\",\n        \"duration\": \"25 minutes\"\n      },\n      {\n        \"chapterName\": \"Functions and Modules\",\n        \"about\": \"Explore functions to organize code, break down tasks into reusable blocks, and learn about modules to import and use external libraries.\",\n        \"duration\": \"15 minutes\"\n      },\n      {\n        \"chapterName\": \"Data Structures: Lists, Tuples, Dictionaries\",\n        \"about\": \"Dive into Python's fundamental data structures: lists, tuples, and dictionaries, and learn how to work with them effectively.\",\n        \"duration\": \"15 minutes\"\n      }\n    ]\n  }\n}\n```" },
            ],
        },
    ],
});

export const generateAiChapterContent = model.startChat({
    generationConfig,
    history: [
        {
            role: "user",
            parts: [
                { text: "Explain the concept in detail for topic: NextJS, Chapter: Data Fetching and Server-Side Rendering, in JSON format which is a list of objects with properties as title, explanation which is a detailed explanation for the chapter, and codeExample in <precode> format if applicable." },
            ],
        },
        {
            role: "model",
            parts: [
                { text: "```json\n[\n  {\n    \"title\": \"Data Fetching in Next.js\",\n    \"explanation\": \"Next.js offers several methods for fetching data, allowing you to dynamically render pages with content from external sources. Here are the most common approaches:\",\n    \"codeExample\": \"\"\n  },\n  {\n    \"title\": \"1. Server-Side Rendering (SSR)\",\n    \"explanation\": \"SSR involves fetching data on the server before sending the fully rendered HTML to the client. This improves initial page load speed and SEO by providing crawlers with fully rendered content. In Next.js, you achieve SSR using the `getServerSideProps` function.\",\n    \"codeExample\": \"<precode>\\nexport async function getServerSideProps() {\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  return {\\n    props: { data },\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // ... use data to render the component\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"2. Static Site Generation (SSG)\",\n    \"explanation\": \"SSG pre-renders your pages during build time, resulting in static HTML files served directly to users. This approach is ideal for content that changes infrequently. You can use `getStaticProps` in Next.js for SSG.\",\n    \"codeExample\": \"<precode>\\nexport async function getStaticProps() {\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  return {\\n    props: { data },\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // ... use data to render the component\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"3. Client-Side Rendering (CSR)\",\n    \"explanation\": \"CSR renders pages on the client's browser after the initial HTML load. While it's less performant for the initial load, it's suitable for dynamic content and user interactions. In Next.js, use `useEffect` (or other React hooks) to fetch data after the component mounts.\",\n    \"codeExample\": \"<precode>\\nimport { useState, useEffect } from 'react';\\n\\nfunction MyComponent() {\\n  const [data, setData] = useState(null);\\n\\n  useEffect(() => {\\n    const fetchData = async () => {\\n      const res = await fetch('https://api.example.com/data');\\n      const data = await res.json();\\n      setData(data);\\n    };\\n\\n    fetchData();\\n  }, []);\\n\\n  if (!data) {\\n    return <div>Loading...</div>;\\n  }\\n\\n  // ... use data to render the component\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"4. Incremental Static Regeneration (ISR)\",\n    \"explanation\": \"ISR combines the benefits of SSG and SSR. Pages are pre-rendered statically, but can be revalidated at intervals or on demand. This allows for dynamic content while maintaining good SEO and performance. Use `revalidate` in `getStaticProps` to configure revalidation behavior.\",\n    \"codeExample\": \"<precode>\\nexport async function getStaticProps() {\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  return {\\n    props: { data },\\n    revalidate: 60, // Revalidate every 60 seconds\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // ... use data to render the component\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"Choosing the Right Data Fetching Method\",\n    \"explanation\": \"The choice of data fetching strategy depends on your application's requirements:\\n\\n* **SSR:**  For optimal SEO and initial page load performance, especially for dynamic content that changes frequently.\\n* **SSG:** Ideal for static content that rarely updates, leading to fast page loads and low server load.\\n* **CSR:** Suited for highly interactive and dynamic pages where the initial load time is less critical.\\n* **ISR:**  A balance between SSG and SSR, perfect for pages with semi-dynamic content that needs to be updated periodically.\",\n    \"codeExample\": \"\"\n  },\n  {\n    \"title\": \"Data Fetching Best Practices\",\n    \"explanation\": \"For efficient data fetching in Next.js, follow these guidelines:\\n\\n* **Minimize API Requests:** Fetch data only when necessary and avoid unnecessary re-fetches.\\n* **Data Caching:** Implement caching mechanisms to reduce server load and improve performance.\\n* **Error Handling:** Implement robust error handling to gracefully handle failed data requests and provide informative feedback to users.\\n* **Data Validation:** Ensure the integrity of your data by validating it before using it to render components.\",\n    \"codeExample\": \"\"\n  },\n  {\n    \"title\": \"Server-Side Rendering (SSR)\",\n    \"explanation\": \"SSR allows you to render your pages on the server before sending the fully rendered HTML to the client. This has several benefits:\\n\\n* **Improved SEO:** Search engine crawlers see the fully rendered HTML, making it easier to index your content.\\n* **Faster Initial Load:** The browser receives the pre-rendered HTML, resulting in faster initial page loads.\\n* **Dynamic Content:** Fetch data from APIs or databases on the server, allowing for dynamically generated content.\\n\\nYou achieve SSR in Next.js using the `getServerSideProps` function:\",\n    \"codeExample\": \"<precode>\\nexport async function getServerSideProps() {\\n  // Fetch data from an API or database\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  // Return props to the component\\n  return {\\n    props: { data },\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // Use the fetched data to render the component\\n  return (\\n    <div>\\n      <h1>{data.title}</h1>\\n      <p>{data.description}</p>\\n    </div>\\n  );\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"Static Site Generation (SSG)\",\n    \"explanation\": \"SSG pre-renders your pages at build time, creating static HTML files that are served directly to users. This approach is ideal for content that changes infrequently, as it offers excellent performance and SEO benefits:\\n\\n* **Super-fast Page Loads:** Static HTML files load quickly, providing a seamless user experience.\\n* **Zero Server-Side Processing:**  Pages are delivered directly from the CDN, reducing server load.\\n* **Ideal for SEO:**  Search engines can easily crawl and index static content.\\n\\nYou use the `getStaticProps` function in Next.js for SSG:\",\n    \"codeExample\": \"<precode>\\nexport async function getStaticProps() {\\n  // Fetch data from an API or database\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  // Return props to the component\\n  return {\\n    props: { data },\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // Use the fetched data to render the component\\n  return (\\n    <div>\\n      <h1>{data.title}</h1>\\n      <p>{data.description}</p>\\n    </div>\\n  );\\n}\\n</precode>\"\n  },\n  {\n    \"title\": \"Incremental Static Regeneration (ISR)\",\n    \"explanation\": \"ISR combines the advantages of SSG and SSR, allowing you to pre-render pages statically while enabling them to be revalidated at intervals or on demand. This approach is ideal for semi-dynamic content that needs occasional updates:\\n\\n* **Pre-rendered for Speed:**  Pages are pre-rendered for fast initial loads.\\n* **Automatic Updates:** Pages are revalidated periodically (or on demand), ensuring up-to-date content.\\n* **Better Performance than SSR:**  It avoids the overhead of server-side rendering for each request.\\n\\nYou configure ISR using the `revalidate` option in `getStaticProps`:\",\n    \"codeExample\": \"<precode>\\nexport async function getStaticProps() {\\n  // Fetch data from an API or database\\n  const res = await fetch('https://api.example.com/data');\\n  const data = await res.json();\\n\\n  // Return props to the component with revalidation set\\n  return {\\n    props: { data },\\n    revalidate: 60, // Revalidate every 60 seconds\\n  };\\n}\\n\\nfunction MyComponent({ data }) {\\n  // Use the fetched data to render the component\\n  return (\\n    <div>\\n      <h1>{data.title}</h1>\\n      <p>{data.description}</p>\\n    </div>\\n  );\\n}\\n</precode>\"\n  }\n]\n```" },
            ],
        },
    ],
});