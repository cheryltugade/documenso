import {
  defaultHandler,
  defaultResponder,
  getUserFromToken,
} from "@documenso/lib/server";
import prisma from "@documenso/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { sendSignedMail, sendSigningRequest } from "@documenso/lib/mail";
import { SendStatus } from "@prisma/client";

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUserFromToken(req, res);
  const { id: documentId } = req.query;

  if (!user) return;

  if (!documentId) {
    res.status(400).send("Missing parameter documentId.");
    return;
  }

  const document = await prisma.document.findFirstOrThrow({
    where: {
      id: +documentId,
    },
    include: {
      User: {
        select: {
          name: true,
          email: true,
        },
      },
      Recipient: true,
    },
  });

  if (!document)
    res.status(404).end(`No document with id ${documentId} found.`);

  // todo handle sending to single recipient even though more exist

  const recipients = prisma.recipient.findMany({
    where: {
      documentId: +documentId,
      // sendStatus: SendStatus.NOT_SENT, // TODO REDO AFTER DEBUG
    },
  });
  (await recipients).forEach(async (recipient) => {
    await sendSigningRequest(recipient, document)
      .then(() => {
        res.status(200).end();
      })
      .catch((err) => {
        return res.status(502).end("Coud not send request for signing.");
      });
  });

  // todo check if recipient has an account and show them in their inbox or something
}

export default defaultHandler({
  POST: Promise.resolve({ default: defaultResponder(postHandler) }),
});