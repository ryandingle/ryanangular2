import { SelectizeModel } from './index';

export const DefaultConfig = {
  highlight: false,
  create: false,
  persist: true,
  plugins: ['dropdown_direction', 'remove_button'],
  dropdownDirection: 'down'
};

export const SelectMultiConfig: any = Object.assign({}, DefaultConfig, {
  labelField: 'label',
  valueField: 'value',
  maxItems: 1000
});

export const ExampleValues: SelectizeModel[] = <SelectizeModel[]>[
  {
    label: 'Angular',
    value: 'angular',
  }, {
    label: 'ReactJS',
    value: 'reactjs',
  }, {
    label: 'Ember JS',
    value: 'emberjs',
  }, {
    label: 'Ruby on Rails',
    value: 'ruby_on_rails',
  }
];