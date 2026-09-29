/** A three-part headline with the middle part in the accent colour. */
export default function Accent({ parts }: { parts: readonly [string, string, string] }) {
  const [before, accent, after] = parts
  return (
    <>
      {before}
      <span className="text-primary">{accent}</span>
      {after}
    </>
  )
}
