import inputClassName from '@/utils/api/inputClassName';
import { ChangeEvent, Component, ReactElement } from 'react';
import inputFormClassName from '@/utils/api/InputFormClassName';
interface ComponentsProps {
  data: string;
  setData: (value: string) => void;
  required?: boolean;
  disable: boolean;
  maxTextLength?: number;
  showmMaxTextLength?: boolean;
  placeholder?: string;
  title?: string; // Posible error tipográfico, podría ser "title"
  description?: string;
}

export default function EditEmail({
  data,
  setData,
  required = false,
  disable = false,
  maxTextLength = 120,
  showmMaxTextLength = false,
  placeholder = '',
  title = '', // Posible error tipográfico, podría ser "title"
  description = '',
}: ComponentsProps) {

    const handleInputChange=(e:ChangeEvent<HTMLInputElement>)=>{
        let inputValue= e.target.value

        inputValue=inputValue
            .replace(/<script.*?>.*?<\/script>/gi,'')
            .replace(/<\/?[^>]+(>|$)/g,'')
            .replace(/[;:"!]/g,'')

        setData(inputValue)
    }



  return (
    <div>
      <span className="text-grey-800 dark:text-dark-txt block text-sm font-bold">{title}</span>
      <span className="dark:text-dark-txt-secondary mb-2 block text-sm text-gray-500">
        {description}
      </span>
      <div className={`${inputFormClassName}`}>
        <input
          type="email"
          required={required}
          disabled={disable}
          placeholder={placeholder}
          value={data}
          maxLength={maxTextLength}
          className={`${inputClassName}`}
          onChange={handleInputChange}
        />
        {showmMaxTextLength && (
          <div>
            <span>
              {data?.length} of {maxTextLength}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

EditEmail.defaultProps = {
  required: false,
  disable: false,
  maxTextLength: 120,
  showmMaxTextLength: false,
  placeholder: '',
  tile: '', // Posible error tipográfico, podría ser "title"
  description: '',
};
