import DB from "./db.ts";

export const getBooks = async ({ response }: { response: any }) => {
  response.status = 200;
  response.body = await books.find({});
};

export const getBook = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const book: any = await getBy(params.id);
  if (book) {
    response.status = 200;
    response.body = book;
  } else {
    response.status = 404;
  }
};

export const addBook = async (
  { request, response }: { request: any; response: any },
) => {
  const body = await request.body();
  const book = body.value;
  const newBook = await books.insertOne(
    { author: book.author, title: book.title },
  );
  response.body = newBook;
  response.status = 201;
};

export const updateBook = async (
  { params, request, response }: {
    params: { id: string };
    request: any;
    response: any;
  },
) => {
  let book = await getBy(params.id);
  if (book) {
    const body = await request.body();
    const update: { author?: string; title?: string } = body.value;
    book = { ...book, ...update };
    await books.updateOne({
      _id: {
        "$oid": params.id,
      },
    }, book);
    response.status = 200;
  } else {
    response.status = 404;
  }
};

export const deleteBook = async (
  { params, response }: { params: { id: string }; response: any },
) => {
  const book = await getBy(params.id);
  if (book) {
    await books.deleteOne({
      _id: {
        "$oid": params.id,
      },
    });
    response.status = 200;
  } else {
    response.status = 404;
  }
};

const getBy = async (id: string): (Promise<any>) =>
  await books.findOne({
    _id: {
      "$oid": id,
    },
  });

const books = DB.collection("books");

await books.deleteMany({});

let initialBooks: any[] = [{
  author: "George R. R. Martin",
  title: "A Game of Thrones",
}, {
  author: "George R. R. Martin",
  title: "A Clash of Kings",
}, {
  author: "George R. R. Martin",
  title: "A Storm of Swords",
}, {
  author: "George R. R. Martin",
  title: "A Feast for Crows",
}, {
  author: "George R. R. Martin",
  title: "A Dance with Dragons",
}];

await books.insertMany(initialBooks);
