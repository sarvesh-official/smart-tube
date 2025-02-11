/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */


// @ts-nocheck

"use client";

import { useEffect } from "react";
import type {} from 'ldrs'


const Loader = () => {
  useEffect(() => {
    async function getLoader() {
      const { trio } = await import("ldrs");
      trio.register();
    }
    getLoader();
  }, []);
  return (
    <div className="h-full w-full bg-primary-1 flex items-center justify-center">
      <div className="flex justify-center items-center">
        <l-trio
          size="50"
          stroke="8"
          stroke-length="0.15"
          bg-opacity="0.1"
          speed="1.4"
          color="#BA6EF2"
        ></l-trio>
      </div>
    </div>
  );
};

export default Loader;
