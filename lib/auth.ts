import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { Session, getServerSession } from "next-auth";

export async function getSession(
  req?: NextApiRequest | GetServerSidePropsContext["req"],
  res?: NextApiResponse | GetServerSidePropsContext["res"]
) {
  if (!req || !res) {
    return (await getServerSession(authOptions)) as Session;
  }

  return (await getServerSession(req, res, authOptions)) as Session;
}
