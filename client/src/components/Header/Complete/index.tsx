import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import { Input, AutoComplete } from 'antd';
import { SelectProps } from 'antd/es/select'
import classes from './Complete.module.scss';

type User = {
  userId: string;
};

const tasks = [
  {id: '1', name: 'Task1'}, {id: '2', name: 'Task2'}, {id: '3', name: 'Task3'},
];

function  searchResult(query: string) {
  const res: Array<{value: string, label: React.ReactNode}> = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].name.toLocaleLowerCase().includes(query.toLocaleLowerCase())) {
      res.push({value: tasks[i].name, label: <Link to="/"><div className={classes.link} >{tasks[i].name}</div></Link>});
    }
  }
  return res;
}

const Complete: React.FC<User> = ({userId}) => { 
  const [options, setOptions] = useState<SelectProps<object>['options']>([]);
  const [icon, setIcon] = useState(true);
  const [value, setValue] = useState('');
  
  function  handleSearch(value: string) {
    setOptions(value ? searchResult(value) : []);
  };

  function onBlur(event: React.FocusEvent<HTMLInputElement>) {
    setIcon(true);
  }

  function onFocus() {
    setIcon(false);
  }

  return (
    <div className={classes.search}>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        options={value ? options : []}
        onSearch={handleSearch}
        onBlur={onBlur}
        onFocus={onFocus}
        value={value}
        dropdownClassName={classes.dropdown}
      >
        <Input
          allowClear 
          value={value}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
            event.target.value = '';
            setValue('');
          }}
          onBlur={() => {
              const input: HTMLElement | null = document.getElementById('complete_input');
              input && (input.innerText = '');
              setValue('');
            }
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value)}
          suffix={icon ? <SearchOutlined /> : null}
        />
      </AutoComplete>
    </div>
  ); 
};

export default Complete;
