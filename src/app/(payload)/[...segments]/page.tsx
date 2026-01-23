import configPromise from "@payload-config";
import "@payloadcms/next/css";
import { RootPage, generatePageMetadata } from "@payloadcms/next/views";
import type { Metadata } from "next";
import React from "react";

type Args = {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<{
    [key: string]: string | string[];
  }>;
};

export const generateMetadata = ({
  params,
  searchParams,
}: Args): Promise<Metadata> =>
  generatePageMetadata({ config: configPromise, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config: configPromise, params, searchParams });

export default Page;
