import ReactQuill, { Quill } from "react-quill";
import { ImageDrop } from "quill-image-drop-module";
import { useMemo } from "react";
Quill.register("modules/imageDrop", ImageDrop);

function WriteThing() {
    const modules = useMemo(()=>{
        return {
            imageDrop: true,
            clipboard: {
                matchVisual: false
            }
        }
    })
 return (
   <>
     <ReactQuill theme="snow"
       style={{ width: "800px", height: "600px" }}
        modules={modules}
     />
   </>
 );
}
export default WriteThing;