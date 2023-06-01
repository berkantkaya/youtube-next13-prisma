'use client';
import Select from 'react-select'
import Countries from 'world-countries';

export const getCountries = Countries?.map(countries => {
    return {
        name : countries.name.common,
        flag: countries.flag,
        lating: countries.latlng
    }
})

type CountrySelectProps = {
    value?: string | any;
    onChange: (value : any) => void
}

const options : any = getCountries.map(country => ({value: country.name, label: country.name, flag: country.flag})) 
const CountrySelect:React.FC<CountrySelectProps> = ({value, onChange}) => {
  return (
    <div>
        <Select
         placeholder="Ülke Seç"
         options={options}
         isClearable
         value={value}
         onChange={value => onChange(value)}
         isSearchable
         formatOptionLabel={(val: any) => (
            <div className='flex items-center gap-2'>
                {val.flag} {val.value}
            </div>
         )}
        />
    </div>
  )
}

export default CountrySelect