import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Product: a
    .model({
      title: a.string(),
      artist: a.string(),
      src: a.string(),
      description: a.string(),
      price: a.string(),
      avgRating: a.float(),
      reviews: a.integer(),
      inStock: a.boolean(),
      readyForPickup: a.boolean(),
      bestSeller: a.boolean(),
      isNew: a.boolean(),
      limitedSupply: a.boolean(),
    })
    .authorization((allow) => [allow.publicApiKey()]),

  Order: a
  .model({
    orderID: a.string().id(),
    productId: a.string(),
    quantity: a.integer(),
    totalPrice: a.float(),
    status: a.enum(["Pending", "Shipped", "Delivered", "Cancelled"]).default("Pending"),
    orderesAt: a.dateTime(),
    customerName: a.string(),
    customerEmail: a.string(),
    ShippingAddress: a.string(),
  })
    .authorization((allow) => [allow.publicApiKey()]),

Transaction: a
  .model({
    transactionId: a.string().id(),
    orderId: a.string(),
    paymentMethod: a.enum(["CreditCard", "PayPal", "BankTransfer", "Cash"]),
    paymentStatus: a.enum(["Pending", "Transaction Successfull", "Transaction Failed", "Refunded"]).default("Pending"),
    transactionDate: a.dateTime()'
    amount: a.float(),
  })
  .authorization((allow) => [allow.publicApiKey()]),

  Location: a
  .model({
    locationId: a.string().id(),
    address: a.string(),
    city: a.string(),
    state: a.string(),
    PostalCode: a.string(),
    country: a.string(),
    longitude: a.float(),
    latitude: a.float(),
  })
  .authorization((allow) => [allow.publicApiKey()]),

  User: a
  .model({
    userId: a.string().id(),
    name: a.string(),
    email: a.string(),
    phone: a.string(),
    registeredAt: a.dateTime(),
    address: a.string(),
    city: a.string(),
    state: a.string(),
    postalCode: a.String(),
  })
  .authorization((allow) => [allow.publicApiKey()]),
    
});


export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "apiKey",
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
