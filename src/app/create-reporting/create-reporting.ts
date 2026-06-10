import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

type FieldType = 'text' | 'textarea';

interface FormField {
  id: string;
  label: string;
  type: FieldType;
  required?: boolean;
  rows?: number;
  value: string;
}

interface StepItem {
  id: number;
  label: string;
  active: boolean;
}

interface TagOption {
  id: string;
  label: string;
  description: string;
}

interface ModuleGroup {
  id: string;
  title: string;
  checked: boolean;
  children?: string[];
  options?: TagOption[];
  infoBox?: string[];
  selectedOption?: string;
}

interface SimpleModule {
  id: string;
  label: string;
  checked: boolean;
}

interface ConfigItem {
  id: string;
  label: string;
  description: string;
  checked: boolean;
}

@Component({
  selector: 'app-create-reporting',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-reporting.html',
  styleUrl: './create-reporting.scss'
})
export class CreateReporting {
  submitted = signal(false);

  pageData = {
    steps: [
      {
        id: 1,
        label: 'Create Reporting Tag',
        active: true
      },
      {
        id: 2,
        label: 'Configure Options',
        active: false
      }
    ] as StepItem[],

    alert: {
      closable: true,
      points: [
        'Enter a name for the reporting tag.',
        'Kindly select the modules for which you want to associate this reporting tag.'
      ]
    },

    fields: [
      {
        id: 'tagName',
        label: 'Reporting Tag Name',
        type: 'text',
        required: true,
        value: ''
      },
      {
        id: 'description',
        label: 'Description',
        type: 'textarea',
        rows: 3,
        value: ''
      }
    ] as FormField[],

    association: {
      title: 'Associate This Reporting Tag To',
      description:
        'You can select the modules for which you want to associate reporting tags.'
    },

    moduleGroups: [
      {
        id: 'sales-purchases-inventory',
        title: '',
        checked: false,
        children: ['Sales', 'Purchases', 'Inventory'],
        selectedOption: '',
        options: [
          {
            id: 'transaction',
            label: 'At Transaction Level',
            description:
              'The reporting tag is applied to the entire transaction.'
          },
          {
            id: 'line-item',
            label: 'At Line Item Level',
            description:
              'The reporting tag is applied to individual line items within a transaction.'
          }
        ]
      },
      {
        id: 'journals',
        title: 'Journals',
        checked: false,
        selectedOption: '',
        options: [
          {
            id: 'transaction',
            label: 'At Transaction Level',
            description:
              'The reporting tag is applied to the entire transaction.'
          },
          {
            id: 'line-item',
            label: 'At Line Item Level',
            description:
              'The reporting tag is applied to individual line items within a transaction.'
          }
        ]
      },
      {
        id: 'banking',
        title: 'Banking',
        checked: false,
        selectedOption: '',
        infoBox: [
          'Banking transactions will follow the Transaction Level tagging method by default.',
          'Bank Deposits like Deposits From Other Accounts and Deposits To Other Accounts in Banking will follow the tagging method you select below.'
        ],
        options: [
          {
            id: 'transaction',
            label: 'At Transaction Level',
            description:
              'The reporting tag is applied to the entire transaction.'
          },
          {
            id: 'line-item',
            label: 'At Line Item Level',
            description:
              'The reporting tag is applied to individual line items within a transaction.'
          },
          {
            id: 'both',
            label: 'At Both Levels',
            description:
              'The reporting tag is applied to the entire transaction as well as to individual line items within the transaction.'
          }
        ]
      }
    ] as ModuleGroup[],

    simpleModules: [
      {
        id: 'customers',
        label: 'Customers',
        checked: false
      },
      {
        id: 'vendors',
        label: 'Vendors',
        checked: false
      },
      {
        id: 'items',
        label: 'Items',
        checked: false
      }
    ] as SimpleModule[],

    configurations: {
      title: 'Configurations',
      items: [
        {
          id: 'mandatory',
          label: 'Make this reporting tag as mandatory',
          checked: false,
          description:
            'Requires you to provide input for the reporting tag field. However, it will be skipped for auto-created transactions and in certain apps where this field is not present.'
        }
      ] as ConfigItem[]
    },

    actions: {
      primary: 'Save and Continue',
      secondary: 'Cancel'
    }
  };

  getFieldValue(id: string): string {
    return this.pageData.fields.find(field => field.id === id)?.value?.trim() ?? '';
  }

  isAnyModuleSelected(): boolean {
    const groupSelected = this.pageData.moduleGroups.some(group => {
      const parentChecked = group.checked;
      const childChecked = group.children?.some(child => this.isChildChecked(group.id, child));
      return parentChecked || childChecked;
    });

    const simpleSelected = this.pageData.simpleModules.some(item => item.checked);

    return groupSelected || simpleSelected;
  }

  childSelections: Record<string, Record<string, boolean>> = {};

  isChildChecked(groupId: string, child: string): boolean {
    return this.childSelections[groupId]?.[child] ?? false;
  }

  toggleChild(groupId: string, child: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    if (!this.childSelections[groupId]) {
      this.childSelections[groupId] = {};
    }

    this.childSelections[groupId][child] = checked;

    const group = this.pageData.moduleGroups.find(item => item.id === groupId);
    if (group) {
      group.checked = group.children?.some(item => this.isChildChecked(groupId, item)) ?? false;
    }
  }

  onSubmit(): void {
    this.submitted.set(true);

    const hasName = this.getFieldValue('tagName').length > 0;
    const hasModule = this.isAnyModuleSelected();

    if (!hasName || !hasModule) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      return;
    }

    const payload = this.createPayload();
    console.log('Reporting Tag Payload:', payload);
  }

  onCancel(): void {
    this.submitted.set(false);

    this.pageData.fields.forEach(field => {
      field.value = '';
    });

    this.pageData.moduleGroups.forEach(group => {
      group.checked = false;
      group.selectedOption = '';
    });

    this.pageData.simpleModules.forEach(item => {
      item.checked = false;
    });

    this.pageData.configurations.items.forEach(item => {
      item.checked = false;
    });

    this.childSelections = {};
  }

  hideAlert(): void {
    this.submitted.set(false);
  }

  private createPayload() {
    return {
      fields: this.pageData.fields.reduce<Record<string, string>>((acc, field) => {
        acc[field.id] = field.value;
        return acc;
      }, {}),
      moduleGroups: this.pageData.moduleGroups.map(group => ({
        id: group.id,
        title: group.title,
        checked: group.checked,
        selectedChildren: group.children?.filter(child => this.isChildChecked(group.id, child)) ?? [],
        selectedOption: group.selectedOption
      })),
      simpleModules: this.pageData.simpleModules.filter(item => item.checked),
      configurations: this.pageData.configurations.items.filter(item => item.checked)
    };
  }
}