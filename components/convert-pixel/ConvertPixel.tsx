"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCopyToClipboard } from "react-use";
import usePixelConverter from "../../hooks/usePixelConverter";
import FavoriteToolButton from "../favorite-tool-button/FavoriteToolButton";
import Input from "../input/Input";

const DEFAULT_TEXT = "Click to copy";
const COPY_TEXT = "Copied!";
const DEFAULT_ROOT_FONT_SIZE = "16px";
const DEFAULT_ROOT_PIXEL_VALUE = 16;

const ConvertPixel = () => {
  const [copyText, setCopyText] = useState(DEFAULT_TEXT);

  const {
    register,
    handleSubmit,
    formState: { isSubmitted },
    getValues,
    watch,
  } = useForm();
  const onSubmit = () => {};

  const { convertedValue, to } = usePixelConverter(
    getValues().pixelValue,
    [isSubmitted],
    {
      rootEm: watch("rootEm", DEFAULT_ROOT_FONT_SIZE),
    }
  );

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
    <section className="py-6 max-w-[120rem] mx-auto">
      <div className="flex gap-4 w-fit mx-auto">
        <h3 className="text-4xl font-black mb-3 text-sky-800 w-fit text-center">
          Pixel to Rem Converter
        </h3>
        <FavoriteToolButton componentName="convert-pixel/ConvertPixel.tsx" />
      </div>
      <form className="flex flex-wrap w-full gap-4 px-4 lg:px-0 py-6">
        <div className="flex items-center flex-1 gap-4 min-w-full lg:min-w-fit">
          <div className="flex-1 min-w-[50%]">
            <label htmlFor="rootEm">Root font size</label>
            <div className="flex items-center">
              <Input
                type="number"
                placeholder="Root font size"
                id="rootEm"
                {...register("rootEm", {
                  max: 9007199254740991,
                  min: 1,
                })}
                defaultValue={DEFAULT_ROOT_PIXEL_VALUE}
              />
              <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
                px
              </article>
            </div>
          </div>
          <div className="flex-1">
            <label htmlFor="pixelValue">Pixel Value</label>
            <Input
              type="number"
              placeholder="Pixel Value"
              id="pixelValue"
              {...register("pixelValue", {
                required: true,
                max: 9007199254740991,
                min: 1,
              })}
              onBlur={handleSubmit(onSubmit)}
              defaultValue={DEFAULT_ROOT_PIXEL_VALUE}
            />
          </div>
          <span className="text-4xl font-black mb-3 text-sky-800 w-fit mt-auto">
            {`=>`}
          </span>
        </div>
        <div className="flex flex-1 relative min-w-full lg:min-w-fit">
          <div className="flex-1">
            <label htmlFor="convertedValue">Converted Value</label>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                placeholder="Converted Value"
                value={
                  isNaN(convertedValue) || !convertedValue ? "" : convertedValue
                }
                readOnly
                className="cursor-pointer"
                onClick={() => copyToClipboard(`${convertedValue}${to}`)}
                id="convertedValue"
              />
              <small className="absolute -bottom-8 left-1">{copyText}</small>
              <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
                {to}
              </article>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
};

export default ConvertPixel;
