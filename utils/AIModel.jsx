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