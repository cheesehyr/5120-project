import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";
import {skinTypeOptions} from "./dataService.js";
import './SkinTypeSelect.css';

function SkinTypeSelect({value, onChange}) {
    return (
        <FormControl className="dropdown">
            <InputLabel id="skin-type-label">Skin Type</InputLabel>
            <Select
                labelId="skin-type-label"
                value={value}
                onChange={onChange}
                label="Skin Select"
                renderValue={selected => {
                    const selectedOption = skinTypeOptions.find(option => option.value === selected);
                    return selectedOption ? selectedOption.value + " : " + selectedOption.label : '';
                }}
            >
                {skinTypeOptions.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                        <div style={{display: 'flex', alignItems: 'center', gap: "10px"}}>
                            <div style={{background: `linear-gradient(to right, ${option.color1}, ${option.color2})`, width: 100, height: 50}}></div>
                            <img src={option.img1} alt="Skin Type 1" style={{height: 50, mixBlendMode: "multiply"}}/>
                            <img src={option.img2} alt="Skin Type 2" style={{height: 50, mixBlendMode: "multiply"}}/>
                            <div style={{display: "flex", flexDirection: "column"}}>
                                <span>Type: {option.value}</span>
                                <ul style={{whiteSpace: "normal", wordWrap: "break-word", maxWidth: "335px", listStyle: "none"}}>
                                    {option.label.split(",").map((item, index) => (
                                        <li key={index}>➤ {item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}

export default SkinTypeSelect;