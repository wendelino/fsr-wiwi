"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from 'react-dom'

const ScrollPath = () => {
  const pathRef = useRef<SVGPathElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<any>();

  useEffect(() => {
    const path = pathRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    // Calculate the path length
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;

    const scrollTop = container.getBoundingClientRect();
    const scrollHeight = container.scrollHeight;
    const clientHeight = container.clientHeight;

    const handleScroll = () => {
        const rect = container.getBoundingClientRect();

        const start = rect.top + window.scrollY ;
        const end = start + rect.height;
        const scroll = (window.scrollY - start)/ rect.height

        if (end <= window.scrollY) return
        if (start >= window.scrollY) return
        setPos({
            start, end, scroll,
          rect,
          viewport: {
            scrollY: window.scrollY,
            scrollX: window.scrollX
          }
        });

      const scrollPercentage = scroll
      const drawLength = pathLength * (1 - scrollPercentage);
      path.style.strokeDashoffset = `${drawLength}`;
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative space-y-8 border" ref={containerRef}>
      <div className="fixed bottom-0 right-0 border z-50 bg-red-50"><pre> {JSON.stringify(pos, null, 2)}</pre></div>
      <svg className="w-4 h-full absolute top-0 left-0">
        <path
          ref={pathRef}
          d="M 2 0 L 2 1000" // A vertical line path from (2,0) to (2,1000)
          stroke="#3498db"
          strokeWidth="4"
          fill="none"
        />
      </svg>
      {[...Array(3)].map((_, index) => (
        <div key={index} className="p-6 bg-card rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Section {index + 1}</h2>
          <p className="text-gray-600">
            {" "}
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
        </div>
      ))}
    </div>
  );
};

export default ScrollPath;

 

// export const TokyoInfo: React.FC = () => {
//   const svgRef = useRef<SVGSVGElement>(null)
//   const [svgMounted, setSvgMounted] = useState(false)

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       setSvgMounted(true)
//     }
//   }, [])

//   useEffect(() => {
//     if (svgMounted) {
//       const svg = svgRef.current
//       if (!svg) return

//       const createSvgPath = () => {
//         const svgTargets = document.querySelectorAll('.svg-target')
//         const padding = 30
//         let d = ""
//         let prevX = 0
//         let prevY = 0

//         svgTargets.forEach((target, index) => {
//           const { x, y, height } = target.getBoundingClientRect()
//           let xPos = x + window.scrollX - padding
//           let yPos = y + window.scrollY + height / 2

//           if (index === 0) {
//             d += `M ${xPos} ${yPos}`
//           } else {
//             if (prevX != xPos) {
//               const round = 120
//               const midY = (yPos + prevY) / 2
//               if (xPos < prevX) {
//                 d += `L ${prevX} ${midY - round}`
//                 d += `Q ${prevX} ${midY}, ${prevX - round} ${midY}`
//                 d += `L ${xPos + 100} ${midY}`
//                 d += `Q ${xPos} ${midY}, ${xPos} ${midY + round}`
//               } else {
//                 d += `L ${prevX} ${midY - round}`
//                 d += `Q ${prevX} ${midY}, ${prevX + round} ${midY}`
//                 d += `L ${xPos - 100} ${midY}`
//                 d += `Q ${xPos} ${midY}, ${xPos} ${midY + round}`
//               }
//             } else {
//               d += ` L ${xPos} ${yPos}`
//             }
//           }

//           prevX = xPos
//           prevY = yPos
//         })

//         return d
//       }

//       const createPath = (d: string, white: boolean) => {
//         const path = document.createElementNS("http://www.w3.org/2000/svg", "path")
//         path.setAttribute("d", d)
//         path.setAttribute("fill", "none")
//         path.setAttribute("stroke", white ? "#000000" : "#343c48")
//         path.setAttribute("stroke-width", "3")
//         path.setAttribute("stroke-linejoin", "round")
//         path.setAttribute("stroke-linecap", "round")
//         path.setAttribute("stroke-dasharray", "1,10")
//         svg.appendChild(path)
//         return path
//       }

//       const animatePath = (path: SVGPathElement) => {
//         const length = path.getTotalLength()
//         path.style.strokeDasharray = length.toString()
//         path.style.strokeDashoffset = length.toString()

//         const handleScroll = () => {
//           const { scrollTop: bodyScrollTop } = document.body
//           const { clientHeight, scrollHeight, scrollTop } = document.documentElement
//           const height = scrollHeight - clientHeight
//           const top = bodyScrollTop + scrollTop
//           const scrollpercent = top / height
//           const progression = length * scrollpercent
//           path.style.strokeDashoffset = (length - progression).toString()
//         }

//         window.addEventListener("scroll", handleScroll)
//         return () => window.removeEventListener("scroll", handleScroll)
//       }

//       const createSvgPathDot = () => {
//         const svgTargets = document.querySelectorAll('.svg-target')
//         const padding = 30

//         svgTargets.forEach((target) => {
//           const { x, y, height } = target.getBoundingClientRect()
//           const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
//           const xPos = x - padding
//           const yPos = y + window.scrollY + height / 2

//           circle.setAttribute("cx", xPos.toString())
//           circle.setAttribute("cy", yPos.toString())
//           circle.setAttribute("r", "5")
//           circle.setAttribute("fill", "#ffffff")
//           circle.setAttribute("stroke", "#0c1016d9")
//           circle.setAttribute("stroke-width", "4")
//           svg.appendChild(circle)
//         })
//       }

//       const d = createSvgPath()
//       createPath(d, false)
//       const animatedPath = createPath(d, true)
//       createSvgPathDot()

//       const cleanup = animatePath(animatedPath)

//       const handleResize = () => {
//         svg.innerHTML = ""
//         const newD = createSvgPath()
//         createPath(newD, false)
//         const newAnimatedPath = createPath(newD, true)
//         createSvgPathDot()
//         cleanup()
//         animatePath(newAnimatedPath)
//       }

//       window.addEventListener("resize", handleResize)

//       return () => {
//         cleanup()
//         window.removeEventListener("resize", handleResize)
//       }
//     }
//   }, [svgMounted])

//   return (
//     <> 
//       <main>
//         <div className="container"> 
//           <div className="content">
//             <h3 className="svg-target">About Tokyo</h3>
//             <p>
//               Tokyo, the capital of Japan, is a bustling metropolis
//               known for its modern skyscrapers, historic temples, and
//               vibrant street culture. It's a city that beautifully
//               blends tradition and innovation.
//             </p>
//           </div>
//         </div>
//         <div className="container">
//           <div className="content">
//             <h4 className="svg-target">Shinjuku</h4>
//             <p>
//               Shinjuku, known for its skyscrapers and bustling
//               streets, is a neon wonderland. The area around Kabukicho
//               is particularly famous for its neon lights, with
//               countless signs lighting up the night.
//             </p>
//             <h4 className="svg-target">Akihabara</h4>
//             <p>
//               Akihabara, Tokyo's electronics and anime district, is
//               another hotspot for neon lights. The area is a sensory
//               overload of bright lights, colorful signs, and giant
//               anime billboards.
//             </p>
//             <h4 className="svg-target">Ginza</h4>
//             <p>
//               Ginza, Tokyo's upscale shopping district, offers a more
//               sophisticated neon experience. The neon lights here are
//               less chaotic, illuminating the streets with a classy
//               glow.
//             </p>
//           </div> 
//         </div>
//         <div className="container">
//           <div className="presentation">
//             <img src="https://assets.codepen.io/907368/slider-3.jpg" alt="Image of Tokyo" />
//           </div>
//           <div className="content">
//             <h3>Tokyo's Neon Lights</h3>
//             <p>
//               Tokyo is famous for its dazzling neon lights that
//               illuminate the city after dark. The vibrant colors and
//               mesmerizing patterns create a futuristic landscape that
//               is quintessentially Tokyo.
//             </p>
//             <h4 className="svg-target">Shinjuku</h4>
//             <p>
//               Shinjuku, known for its skyscrapers and bustling
//               streets, is a neon wonderland. The area around Kabukicho
//               is particularly famous for its neon lights, with
//               countless signs lighting up the night.
//             </p>
//             <h4 className="svg-target">Shinjuku</h4>
//             <p>
//               Shinjuku, known for its skyscrapers and bustling
//               streets, is a neon wonderland. The area around Kabukicho
//               is particularly famous for its neon lights, with
//               countless signs lighting up the night.
//             </p>
//             <h4 className="svg-target">Shinjuku</h4>
//             <p>
//               Shinjuku, known for its skyscrapers and bustling
//               streets, is a neon wonderland. The area around Kabukicho
//               is particularly famous for its neon lights, with
//               countless signs lighting up the night.
//             </p>
//           </div>
//         </div>
//         <div className="container">
//           <div className="content">
//             <h3>About Tokyo</h3>
//             <p>
//               Tokyo, the capital of Japan, is a bustling metropolis
//               known for its modern skyscrapers, historic temples, and
//               vibrant street culture. It's a city that beautifully
//               blends tradition and innovation.
//             </p>
//             <h4 className="svg-target">Culture</h4>
//             <p>
//               Tokyo's culture is a mix of traditional Japanese values
//               and cutting-edge technology. From ancient shrines to
//               manga shops and robot restaurants, Tokyo offers a
//               cultural experience like no other.
//             </p>
//             <h4 className="svg-target">Travel</h4>
//             <p>
//               Whether it's exploring the historic Asakusa district,
//               shopping in trendy Harajuku, or enjoying the nightlife
//               in Roppongi, Tokyo offers a travel experience that
//               caters to all tastes and interests.
//             </p>
//           </div>
//         </div>
//         <div className="container">
//           <div className="presentation">
//             <img src="https://assets.codepen.io/907368/slide-4_1.jpg" alt="Image of Tokyo" />
//           </div>
//           <div className="content">
//             <h3>About Tokyo</h3>
//             <p>
//               Tokyo, the capital of Japan, is a bustling metropolis
//               known for its modern skyscrapers, historic temples, and
//               vibrant street culture. It's a city that beautifully
//               blends tradition and innovation.
//             </p>
//             <h4 className="svg-target">Culture</h4>
//             <p>
//               Tokyo's culture is a mix of traditional Japanese values
//               and cutting-edge technology. From ancient shrines to
//               manga shops and robot restaurants, Tokyo offers a
//               cultural experience like no other.
//             </p>
//             <h4 className="svg-target">Travel</h4>
//             <p>
//               Whether it's exploring the historic Asakusa district,
//               shopping in trendy Harajuku, or enjoying the nightlife
//               in Roppongi, Tokyo offers a travel experience that
//               caters to all tastes and interests.
//             </p>
//             <h4 className="svg-target">Culture</h4>
//             <p>
//               Tokyo's culture is a mix of traditional Japanese values
//               and cutting-edge technology. From ancient shrines to
//               manga shops and robot restaurants, Tokyo offers a
//               cultural experience like no other.
//             </p>
//             <h4 className="svg-target">Travel</h4>
//             <p>
//               Whether it's exploring the historic Asakusa district,
//               shopping in trendy Harajuku, or enjoying the nightlife
//               in Roppongi, Tokyo offers a travel experience that
//               caters to all tastes and interests.
//             </p>
//           </div>
//         </div>
//       </main>
//       {svgMounted && createPortal(
        
//         <svg
//           ref={svgRef}
//           width="100%"
//           height="100%"
//           style={{
//             position: 'absolute',
//             top: 0,
//             left: 0,
//             bottom: 0,
//             right: 0,
//             pointerEvents: 'none',
//             userSelect: 'none',
//             zIndex: 1,
//           }}
//         />,
//         document.body
//       )}
//     </>
//   )
// }
 