import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoreInformationObject } from "@/types";
import { openPopup } from "../../../../../../../../../lib/utils";
export default function Details({
  moreInformation,
  desc,
  pattern,
  material,
  colour,
  sizes,
  brand,
}: {
  moreInformation: MoreInformationObject[];
  desc: string;
  pattern: string;
  material: string;
  colour: string;
  sizes: string[];
  brand: string;
}) {
  return (
    <Accordion type="single" collapsible className="w-full border-y my-5">
      <AccordionItem value="editors-notes">
        <AccordionTrigger>Editor's Notes</AccordionTrigger>
        <AccordionContent>{desc}</AccordionContent>
      </AccordionItem>
      {moreInformation?.length > 0 && (
        <AccordionItem value="Addittional Information">
          <AccordionTrigger>Addittional Information</AccordionTrigger>
          <AccordionContent>
            <ul className="list-disc pl-5 space-y-1">
              {moreInformation?.map((info) => (
                <li key={info?._key}>{info?.infoText}</li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      )}
      <AccordionItem value="details">
        <AccordionTrigger>Details</AccordionTrigger>
        <AccordionContent>
          <ul className="list-disc pl-5 space-y-1 capitalize">
            {pattern && (
              <li>
                <span className="text-slate-600">Pattern:</span>{" "}
                {pattern.replaceAll("_", " ")}
              </li>
            )}
            <li>
              <span className="text-slate-600">Material:</span>{" "}
              {material?.replaceAll("_", " ")}
            </li>
            <li>
              <span className="text-slate-600">Colour:</span>{" "}
              {colour?.replaceAll("_", " ")}
            </li>
            {sizes?.length > 0 && (
              <li>
                <span className="text-slate-600">Sizes:</span>{" "}
                {sizes.join(", ")}
              </li>
            )}
            <li>
              <span className="text-slate-600">Brand:</span>{" "}
              {brand?.replaceAll("_", " ")}
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="delivery-returns">
        <AccordionTrigger>Delivery and Returns</AccordionTrigger>
        <AccordionContent>
          We do not offer refunds or returns, and delivery is non-refundable.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
