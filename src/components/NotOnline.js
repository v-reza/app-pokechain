import React, { useEffect, useState } from "react";
import { XCircleIcon } from "@heroicons/react/solid";
import useOnline from "@/hooks/useOnline";

const NotOnline = ({ value }) => {
  const [checkOnline, setCheckOnline] = useState(false);
  const { dispatch } = value;
  // console.log(props);
  useEffect(() => {
    setCheckOnline(
      typeof navigator.onLine === "boolean" ? navigator.onLine : true
    );
  }, []);

  return (
    <div>
      <div className="flex items justify-center mx-auto align-middle py-32">
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon
                className="h-5 w-5 text-red-400"
                aria-hidden="true"
              />
            </div>
            <div className="flex flex-col ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Your connection is lost
              </h3>
              <div className="">
                <button
                  type="button"
                  onClick={() => {
                    dispatch({
                      type: "TRY_AGAIN",
                      payload: {
                        online: checkOnline,
                      },
                    });
                  }}
                  className="text-white bg-rose-700 hover:bg-rose-800 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-rose-600 dark:hover:bg-rose-700 dark:focus:ring-rose-800"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotOnline;
