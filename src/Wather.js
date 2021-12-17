import React from 'react'

function Wather({src,city,country,desc,celci,min_tmp,max_tmp}) {
    return (
        <div className="container py-4">
            <div className="cards">
                <h1>{city && city }{country && ","+country}</h1>
                <img className="py-2" src={src && src} alt="" />
                <h1 className="py-2">{celci && celci}&deg;{celci && " C"}</h1>
            </div>

            <MinMaxTem min={min_tmp} max={max_tmp}/>

            <h4 className="py-3" style={{textTransform:"capitalize"}}>{desc}</h4>
        </div>
    )
}

const MinMaxTem=({min,max})=>{
    return(
        <h3>
            <span className="px-4">{min && min }&deg;</span>
            <span className="px-4">{max && max }&deg;</span>
        </h3>
    )
}



export default Wather;
