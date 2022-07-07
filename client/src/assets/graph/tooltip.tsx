

import * as d3 from "d3";

class Tooltip 
{
    private id = "tooltip";

    getTranslation(tooltip: HTMLElement): [number, number] 
    {
        const matrix = window
            .getComputedStyle(tooltip)
            .getPropertyValue("transform")
            .replace('matrix(', '')
            .replace(')', '')
            .split(' ')
            .map( (v: string) => parseInt(v) )

        return [matrix[4], matrix[5]]
    }

    mouseOver( e: any, d: [number, number, number] ) 
    {
        const { clientX, clientY } = e;
        const xVal = Math.round(d[0])
        const yVal = Math.round(d[1] * 100) / 100
        const elt = document.getElementById(this.id) as HTMLElement;
        
        const { width, height } = elt.getBoundingClientRect()

        const tX = Math.max(0, Math.min(clientX - width / 2, window.innerWidth - width))
        const tY = clientY - height * 1.5;

        d3.select('#' + this.id)
            .html(`
                <div>
                    <b>x:</b> ${xVal}<br/>
                </div>
                <div>
                    <b>y:</b> ${yVal}
                </div>
            `)
            .style('transform', `translate(${tX}px, ${tY}px)`)
            .style('z-index', 999999)	
            .style('opacity', 1)
    }

    mouseOut() 
    {
        d3.select('#' + this.id)
            .style('z-index', 0)
            .style("opacity", 0);
    }
}

export default Tooltip