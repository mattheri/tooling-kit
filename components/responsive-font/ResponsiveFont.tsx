"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useCopyToClipboard } from "react-use";
import useCreateResponsiveFonts, {
  IResponsiveFontProps,
} from "../../hooks/useCreateResponsiveFonts";
import Button from "../button/Button";
import Input from "../input/Input";

enum Defaults {
  RootEm = "16px",
  RootPixelValue = 16,
  MinWidth = 320,
  MaxWidth = 1440,
  MinWidthValue = "320px",
  MaxWidthValue = "1440px",
  CopyText = "Copied!",
  DefaultText = "Click to copy",
}

const ResponsiveFont = () => {
  const [numberOfInputs, setNumberOfInputs] = useState(1);
  const [copyText, setCopyText] = useState(Defaults.DefaultText);

  const { register, handleSubmit, reset } = useForm();

  const addRule = () => setNumberOfInputs((prev) => prev + 1);
  const removeRule = () =>
    setNumberOfInputs((prev) => (prev - 1 <= 0 ? 1 : prev - 1));

  const {
    createResponsiveFont,
    createResponsiveFontsRule,
    responsiveFonts,
    resetResponsiveFonts,
  } = useCreateResponsiveFonts();

  const [{ value }, copyToClipboard] = useCopyToClipboard();

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (value) {
      timeout = setTimeout(() => {
        setCopyText(Defaults.DefaultText);
      }, 3000);

      setCopyText(Defaults.CopyText);
    }

    return () => clearTimeout(timeout);
  }, [value]);

  const copyRule = () => {
    if (!responsiveFonts) return;

    copyToClipboard(responsiveFonts);
  };

  const onReset = () => {
    resetResponsiveFonts();
    reset();
    setNumberOfInputs(1);
  };

  const onSubmit = async (data: Record<string, string>) => {
    let currentIndex = 0;
    let currentObject: Partial<IResponsiveFontProps> = {};

    const rules = { ...data };

    delete rules.rootEm;
    delete rules.maxWidth;
    delete rules.minWidth;

    const rulesArray: IResponsiveFontProps[] = [];

    const buildPropertiesArray = (currentIndex: number) => {
      for (const key in rules) {
        const [property, index] = key.split("-");

        if (Number(index) === currentIndex) {
          if (!rules[key]) {
            buildPropertiesArray(currentIndex + 1);
            break;
          }

          currentObject[property] = rules[key];

          if (Object.keys(currentObject).length === 3) {
            currentObject = {
              ...currentObject,
              maxWidth: data.maxWidth,
              minWidth: data.minWidth,
              rootEm: data.rootEm,
            };
            rulesArray.push(currentObject as IResponsiveFontProps);
            currentObject = {};
            buildPropertiesArray(currentIndex + 1);
            break;
          }
        }
      }
    };

    buildPropertiesArray(currentIndex);

    const responsiveFontsCreator = async () => {
      return new Promise((resolve) => {
        rulesArray.forEach((rule) => {
          createResponsiveFont(rule);
        });
        resolve(true);
      });
    };

    responsiveFontsCreator().then(createResponsiveFontsRule);
  };

  return (
    <section className="py-6">
      <h3 className="text-4xl font-black mb-3 text-sky-800 w-fit text-center mx-auto">
        Create Responsive Fonts
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 lg:px-0 flex gap-4 max-w-[120rem] mx-auto flex-wrap">
          <div className="flex-1 min-w-[20rem]">
            <label htmlFor="rootEm">Root font size</label>
            <div className="flex items-center">
              <Input
                {...register("rootEm", {
                  required: true,
                  min: 1,
                  max: Number.MAX_SAFE_INTEGER,
                })}
                id="rootEm"
                defaultValue={Defaults.RootPixelValue}
                type="number"
              />
              <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
                px
              </article>
            </div>
          </div>
          <div className="flex-1 min-w-[20rem]">
            <label htmlFor="minWidth">Min width</label>
            <div className="flex items-center">
              <Input
                {...register("minWidth", {
                  required: true,
                  min: 1,
                  max: Number.MAX_SAFE_INTEGER,
                })}
                id="minWidth"
                defaultValue={Defaults.MinWidth}
                type="number"
              />
              <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
                px
              </article>
            </div>
          </div>
          <div className="flex-1 min-w-[20rem]">
            <label htmlFor="maxWidth">Max width</label>
            <div className="flex items-center">
              <Input
                {...register("maxWidth", {
                  required: true,
                  min: 1,
                  max: Number.MAX_SAFE_INTEGER,
                })}
                id="maxWidth"
                defaultValue={Defaults.MaxWidth}
                type="number"
              />
              <article className="pl-4 bg-white text-4xl font-black mb-3 text-sky-800 w-fit">
                px
              </article>
            </div>
          </div>
          <div className="flex flex-1 items-end min-w-[100%] md:min-w-[20rem]">
            <Button type="button" onClick={addRule}>
              Add rule +
            </Button>
          </div>
          <div className="flex flex-1 items-end min-w-[100%] md:min-w-[20rem]">
            <Button
              type="button"
              onClick={onReset}
              className="bg-red-500 hover:bg-red-400"
            >
              Reset
            </Button>
          </div>
        </div>
        {Array.from({ length: numberOfInputs }, (_, index) => (
          <div
            key={index}
            className="flex flex-col odd:bg-slate-100 even:bg-slate-200 p-4 pb-8"
          >
            <div className="flex gap-4 items-end max-w-[120rem] mx-auto w-full">
              <div className="flex-1">
                <label htmlFor={`variableName-${index}`}>Variable name</label>
                <Input
                  {...register(`variableName-${index}`)}
                  id={`variableName-${index}`}
                  defaultValue={`--font-size-${index + 1}`}
                />
              </div>
              <Button
                className="max-w-[3rem]"
                type="button"
                onClick={removeRule}
              >
                X
              </Button>
            </div>
            <div className="flex items-center gap-4 max-w-[120rem] mx-auto w-full">
              <div className="flex-1">
                <label htmlFor={`minFontSize-${index}`}>Min font size</label>
                <div className="flex items-center">
                  <Input
                    {...register(`minFontSize-${index}`)}
                    id={`minFontSize-${index}`}
                  />
                  <article className="pl-4 text-4xl font-black mb-3 text-sky-800 w-fit">
                    px
                  </article>
                </div>
              </div>
              <div className="flex-1">
                <label htmlFor={`maxFontSize-${index}`}>Max font size</label>
                <div className="flex items-center">
                  <Input
                    {...register(`maxFontSize-${index}`)}
                    id={`maxFontSize-${index}`}
                  />
                  <article className="pl-4 text-4xl font-black mb-3 text-sky-800 w-fit">
                    px
                  </article>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="p-4 lg:px-0 max-w-[120rem] mx-auto w-full">
          <Button type="submit">Generate</Button>
        </div>
      </form>
      {responsiveFonts && (
        <div className="max-w-[120rem] mx-auto w-full">
          <pre
            onClick={copyRule}
            className="max-w-[100%] text-sm md:text-md lg:text-2xl bg-gray-200 p-4 cursor-pointer"
          >
            {responsiveFonts}
          </pre>
          <small>{copyText}</small>
        </div>
      )}
    </section>
  );
};

export default ResponsiveFont;
