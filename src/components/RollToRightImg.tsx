import {
    motion,
    useInView,
    useMotionValueEvent,
    useScroll,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";


export default function RollToRightImg(props) {

    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const rotate = useTransform(
        scrollYProgress,
        [0, 1],
        [props.rotateStart, props.rotateEnd]
    );

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        [props.left, props.right],
    );

    const scale = useTransform(
        scrollYProgress,
        [0, 1],
        [0.5, 1.3],
    );


    return (
        <>
            <div className="overflow-hidden">
                <motion.img
                    ref={targetRef}
                    style={{
                        rotate,
                        x,
                        // scale
                    }}
                    className="size-48 overflow-hidden"
                    src={props.imgSrc}
                >
                    {/* <img src=""></img> */}
                </motion.img>
            </div>
        </>
    );
}
