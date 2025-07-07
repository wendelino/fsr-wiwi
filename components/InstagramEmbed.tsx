import IframeConsent from "./iframe-consent";

export default function InstagramEmbed() {
  return (
    <IframeConsent
      iframe={{
        src: "https://www.instagram.com/fsr.wiwi.halle/embed",
        className: "h-[531px] w-full rounded-xl",
      }}
      label="Instagram"
      disclaimerText="Bitte bestätige das laden von externen Inhalten."
      providerLink="https://www.instagram.com"
    />
  );
}
