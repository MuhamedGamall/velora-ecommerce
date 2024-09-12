import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MoreInformationObject } from "@/types";
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
            {pattern && <li>Pattern: {pattern}</li>}
            <li>Material: {material}</li>
            <li>Colour: {colour}</li>
            {sizes?.length > 0 && <li>Sizes: {sizes.join(", ")}</li>}
            <li>Brand: {brand?.replaceAll("_", " ")}</li>
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
