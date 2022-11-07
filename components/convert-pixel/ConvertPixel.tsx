"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCopyToClipboard } from "react-use";
import usePixelConverter from "../../hooks/usePixelConverter";
import Input from "../input/Input";

const DEFAULT_TEXT = "Click to copy";
const COPY_TEXT = "Copied!";

const ConvertPixel = () => {
  const [copyText, setCopyText] = useState(DEFAULT_TEXT);

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
    getValues,
  } = useForm();
  const onSubmit = (data: any) => console.log(data);

  const { convertedValue, to } = usePixelConverter(getValues().pixelValue, [
    isSubmitted,
  ]);

  const [{ value }, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (value) {
      timeout = setTimeout(() => {
        setCopyText(DEFAULT_TEXT);
      }, 3000);

      setCopyText(COPY_TEXT);
    }

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <section className="py-6">
      <h3 className="text-4xl font-black mb-3 text-sky-800 w-fit text-center mx-auto">
        Pixel to Rem Converter
      </h3>
      <form className="flex w-full gap-4 px-4 py-6">
        <div className="flex flex-1">
          <Input
            type="number"
            placeholder="Pixel Value"
            {...register("pixelValue", {
              required: true,
              max: 9007199254740991,
              min: 1,
            })}
            onBlur={handleSubmit(onSubmit)}
          />
        </div>
        <div className="flex items-center flex-1 relative">
          <Input
            type="number"
            placeholder="Converted Value"
            value={
              isNaN(convertedValue) || !convertedValue ? "" : convertedValue
            }
            readOnly
            className="cursor-pointer"
            onClick={() => copyToClipboard(`${convertedValue}${to}`)}
          />
          <small className="absolute -bottom-8 left-1">{copyText}</small>
          <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
            {to}
          </article>
        </div>
      </form>
    </section>
  );
};

export default ConvertPixel;
