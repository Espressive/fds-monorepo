import React, { PureComponent } from 'react';
import { Dropdown, Header } from 'semantic-ui-react';

import JsonPlaceholder from '../../../placeholders/JsonPlaceholder';

import { generateFakeEmployees } from '../../../lib/mock/generateFakeEmployees';
import Table from '..';

class Fixture extends PureComponent {
  state = {
    columns: [
      {
        attribute: 'active',
        isEditable: true,
        isLabeled: false,
        label: 'Active',
        module: 'checkbox',
      },
      {
        attribute: 'eid',
        isEditable: false,
        isLabeled: false,
        label: 'ID',
        module: 'text',
      },
      {
        attribute: 'email',
        isEditable: true,
        isLabeled: false,
        label: 'Email',
        module: 'email',
      },
      {
        attribute: 'country',
        isEditable: true,
        isLabeled: false,
        label: 'Country',
        module: 'select',
        options: [
          {
            label: 'Argentina',
            value: 'Argentina',
          },
          {
            label: 'Brazil',
            value: 'Brazil',
          },
          {
            label: 'USA',
            value: 'USA',
          },
        ],
      },
      {
        attribute: 'employeeNumber',
        isEditable: true,
        isLabeled: false,
        label: 'Employee Number',
        module: 'number',
      },
      {
        attribute: 'fullName',
        isEditable: true,
        isLabeled: false,
        label: 'Full Name',
        module: 'text',
      },
      {
        attribute: 'homePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Home Phone',
        module: 'text',
      },
      {
        attribute: 'officePhone',
        isEditable: true,
        isLabeled: false,
        label: 'Office Phone',
        module: 'text',
      },
      {
        attribute: 'title',
        isEditable: true,
        isLabeled: false,
        label: 'Title',
        module: 'text',
      },
    ],
    data: generateFakeEmployees(50).map((employee) => ({
      ...employee,
    })),
    display: [
      {
        attribute: 'fullName',
        isEditable: true,
        isLabeled: false,
        label: 'Full Name',
        module: 'text',
      },
      {
        attribute: 'email',
        isEditable: true,
        isLabeled: false,
        label: 'Email',
        module: 'email',
      },
    ],
  };

  handleColumnSelection = (_, { value: selectedColumns }) => {
    const { columns } = this.state;
    const newDisplay = columns
      .filter((column) => selectedColumns.includes(column.attribute))
      .reverse();

    this.setState({ display: newDisplay });
  };

  handleRecordUpdate = (record) => {
    const { data } = this.state;

    const updatedData = data.map((recordInState) => {
      if (recordInState.eid !== record.eid) {
        return recordInState;
      }

      return {
        ...recordInState,
        ...record,
      };
    });

    this.setState({ data: updatedData });
  };

  handleTableAction = (caller, data) => {
    // eslint-ignore-next-line no-console
    console.log(`Action: '${caller.name}' has been invoked:`);
    // eslint-ignore-next-line no-console
    console.table(data);

    switch (caller.name) {
      case 'edit.save':
        this.handleRecordUpdate(data);
        break;

      default:
        return;
    }
  };

  render() {
    const { columns, data, display } = this.state;
    const dataConfig = {
      actions: [
        {
          content: 'view',
          isLabeled: false,
          module: 'button',
          name: 'view',
          size: 'small',
        },
        {
          content: 'edit',
          isLabeled: false,
          module: 'edit',
          name: 'edit',
          size: 'small',
        },
      ],
      display,
    };

    const availableColumns = columns.map((columnDef) => ({
      key: columnDef.attribute,
      text: columnDef.label,
      value: columnDef.attribute,
    }));

    const selectedColumns = display.map((columnDef) => columnDef.attribute);

    return (
      <>
        <JsonPlaceholder data={dataConfig} title='dataConfig' />
        <JsonPlaceholder
          data={{ availableColumns, selectedColumns }}
          title='available vs. selected columns'
        />
        <Header as='h4'>
          <Header.Content>
            Displaying columns: <br />
            <Dropdown
              header='Select columns...'
              key={'select'}
              labeled
              multiple
              onChange={this.handleColumnSelection}
              options={availableColumns}
              placeholder='select columns...'
              selectedLabel={'Display columns'}
              selection
              value={selectedColumns}
            />
          </Header.Content>
        </Header>

        <Table
          data={data}
          dataConfig={dataConfig}
          onAction={this.handleTableAction}
          uniqueIdAttribute={'eid'}
        />
      </>
    );
  }
}

export default Fixture;
