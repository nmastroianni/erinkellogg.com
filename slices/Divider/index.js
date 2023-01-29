/**
 * @typedef {import("@prismicio/client").Content.DividerSlice} DividerSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DividerSlice>} DividerProps
 * @param { DividerProps }
 */
const Divider = ({ slice }) => (
  <div className="mx-auto max-w-screen-lg">
    <div
      className={`my-8 h-1 w-[300px] rounded bg-gradient-to-r from-primary via-secondary to-neutral shadow-sm md:my-10 md:w-[680px] lg:my-12 lg:w-[800px] xl:my-20 xl:w-[1000px]`}
    />
  </div>
)

export default Divider
