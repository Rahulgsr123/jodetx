import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface WebTabColumn {
  key: keyof WebTab;
  label: string;
  colClass: string;
}

interface WebTab {
  id: number;
  name: string;
  url: string;
  lastUpdated: string;
  status: string;
}

interface WebTabsPageData {
  title: string;
  primaryButton: {
    label: string;
  };
  columns: WebTabColumn[];
  emptyState: {
    message: string;
    buttonLabel: string;
    learnText: string;
    learnLinkText: string;
    learnLinkUrl: string;
  };
  tabs: WebTab[];
}

@Component({
  selector: 'app-web-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './web.html',
  styleUrl: './web.scss',
})
export class Web {
  pageData: WebTabsPageData = {
    title: 'Web Tabs',

    primaryButton: {
      label: '+ New Web Tab',
    },

    columns: [
      {
        key: 'name',
        label: 'NAME',
        colClass: 'col-3',
      },
      {
        key: 'url',
        label: 'URL',
        colClass: 'col-4',
      },
      {
        key: 'lastUpdated',
        label: 'LAST UPDATED',
        colClass: 'col-2',
      },
      {
        key: 'status',
        label: 'STATUS',
        colClass: 'col-3',
      },
    ],

    emptyState: {
      message: "You haven't created any web tabs yet.",
      buttonLabel: 'CREATE WEB TAB',
      learnText: 'Learn more about',
      learnLinkText: 'Web Tabs',
      learnLinkUrl: 'javascript:void(0)',
    },

    tabs: [
      // Keep this empty to show the exact empty page like screenshot.

      // Example JSON data:
      // {
      //   id: 1,
      //   name: 'Support',
      //   url: 'https://jodetx.com/support',
      //   lastUpdated: '09 Jun 2026',
      //   status: 'Active',
      // },
    ],
  };

  get hasTabs(): boolean {
    return this.pageData.tabs.length > 0;
  }

  createWebTab(): void {
    const newTab: WebTab = {
      id: Date.now(),
      name: 'New Web Tab',
      url: 'https://example.com',
      lastUpdated: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      status: 'Active',
    };

    this.pageData = {
      ...this.pageData,
      tabs: [...this.pageData.tabs, newTab],
    };
  }

  getCellValue(tab: WebTab, key: keyof WebTab): string | number {
    return tab[key];
  }

  trackByColumn(index: number, column: WebTabColumn): string {
    return column.key;
  }

  trackByTab(index: number, tab: WebTab): number {
    return tab.id;
  }
}