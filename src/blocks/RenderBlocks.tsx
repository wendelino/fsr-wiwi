import type React from "react";
import { Fragment } from "react";
import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component";
import { CallToActionBlock } from "@/blocks/CallToAction/Component";
import { ContentBlock } from "@/blocks/Content/Component";
import { FormBlock } from "@/blocks/Form/Component";
import { MarkdownBlock } from "@/blocks/Markdown/Component";
import { MediaBlock } from "@/blocks/MediaBlock/Component";
import { StepByStepBlock } from "@/blocks/StepByStep/Component";
import { AnimatedSection } from "@/components/AnimatedSection";
import type { Page } from "@/payload-types";

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  markdown: MarkdownBlock,
  mediaBlock: MediaBlock,
  stepByStep: StepByStepBlock,
};

// Blocks that handle their own animations internally
const selfAnimatedBlocks = new Set([
  "cta",
  "content",
  "mediaBlock",
  "stepByStep",
]);

export const RenderBlocks: React.FC<{
  blocks: Page["layout"][0][];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];

            if (Block) {
              const isSelfAnimated = selfAnimatedBlocks.has(blockType);

              const blockEl = (
                <div className="my-16" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              );

              return isSelfAnimated ? (
                blockEl
              ) : (
                <AnimatedSection delay={0} key={index}>
                  <div className="my-16">
                    {/* @ts-expect-error there may be some mismatch between the expected types here */}
                    <Block {...block} disableInnerContainer />
                  </div>
                </AnimatedSection>
              );
            }
          }
          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
