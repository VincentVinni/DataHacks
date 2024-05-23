// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { ChatOpenAI } from "@langchain/openai";
import { createRetrievalChain } from 'langchain/chains/retrieval';
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { Document } from 'langchain/document'; // Import the Document class
import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";


dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const routes = require('./api/routes')
var cors = require("cors");

app.use(cors())
app.use(express.json());
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to CS Gang's Server");
});

app.get("/testAI", async (req: Request, res: Response) => {

  const createDocument = (content: string, metadata?: { [key: string]: any }): Document => {
    return new Document({pageContent: content});
  };

  const retrieveMessages = async (): Promise<Document[]> => {
    try {
      const response = await fetch('http://localhost:6969/api/getConversation');
      if (!response.ok) {
        throw new Error(`Error fetching conversation history: ${response.statusText}`);
      }
      const data: { message: string; sender: string }[] = await response.json();
      return data.map(msg => new Document({
        pageContent: msg.message,
        metadata: { role: msg.sender }
      }));
    } catch (error) {
      console.error('Error fetching conversation history:', error);
      return [];
    }
  };
  
  const chatModel = new ChatOpenAI({
    apiKey: process.env.openAIKey,
  });

  const prompt =
  ChatPromptTemplate.fromTemplate(`Answer the following question by mimicing informal human texting behavior, use provided context only when necessary:

<context>
{context}
</context>

Question: {input}`);

  const embeddings = new OpenAIEmbeddings({openAIApiKey: process.env.openAIKey});

  const splitDocs = await retrieveMessages(); 
  // console.log(splitDocs); 

  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,
    embeddings
  );

  const documentChain = await createStuffDocumentsChain({
    llm: chatModel,
    prompt,
  });

  const retriever = vectorstore.asRetriever();

  const retrievalChain = await createRetrievalChain({
    combineDocsChain: documentChain,
    retriever,
  });

  const result = await retrievalChain.invoke({
    input: req.body.message,
  });

  res.send(result.answer);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app }