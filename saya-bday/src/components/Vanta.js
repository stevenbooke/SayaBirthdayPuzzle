import React from "react";
import NET from 'vanta/dist/vanta.net.min';
import Grid from './Grid';
import './Vanta.css';

const Vanta = () => {
    const [vantaEffect, setVantaEffect] = React.useState(0)
    const vantaRef = React.useRef(null)
    React.useEffect(() => {
        if (!vantaEffect) {
            setVantaEffect(NET({
                el: vantaRef.current,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00
            }))
        }
        return () => {
            if (vantaEffect) vantaEffect.destroy()
        }
    }, [vantaEffect])
    return (
        <div className="vanta" ref={vantaRef}>
        </div>
    )
};

export default Vanta;