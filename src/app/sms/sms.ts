import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

type SmsActionStyle = 'primary' | 'muted' | 'light';

interface SmsButton {
  label: string;
  action: string;
  style: SmsActionStyle;
}

interface SmsInfoButton {
  label: string;
  action: string;
}

interface SmsRow {
  type: 'offer' | 'credits';
  badge?: string;
  text: string;
  button?: SmsButton;
}

interface SmsCard {
  id: string;
  logoType: 'wallet' | 'twilio';
  title: string;
  description: string;
  infoButton?: SmsInfoButton;
  rows?: SmsRow[];
  button?: SmsButton;
}

interface SmsSection {
  id: string;
  title: string;
  cards: SmsCard[];
}

interface SmsPageData {
  title: string;
  sections: SmsSection[];
}

@Component({
  selector: 'app-sms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sms.html',
  styleUrl: './sms.scss',
})
export class Sms {
  pageData: SmsPageData = {
    title: 'SMS Notifications',

    sections: [
      {
        id: 'buy-credits',
        title: 'Buy Credits and Send SMS Notifications',
        cards: [
          {
            id: 'zoho-sms',
            logoType: 'wallet',
            title: 'Zoho Books SMS Integration',
            description:
              'Send SMS notifications to your customers directly from Zoho Books without any external integration. Buy Credits and notify your customers instantly about invoices, payments, balances, etc.',
            infoButton: {
              label: '⋮',
              action: 'info',
            },
            rows: [
              {
                type: 'offer',
                badge: 'FREE SMS',
                text: "We're offering you 3 SMS units for free to try the SMS Notification feature.",
                button: {
                  label: 'Use Free SMS',
                  action: 'use-free-sms',
                  style: 'muted',
                },
              },
              {
                type: 'credits',
                text: 'One credit (300 SMS units) = ₹75. You will need to buy a minimum of 5 credits.',
                button: {
                  label: 'Buy Credits',
                  action: 'buy-credits',
                  style: 'primary',
                },
              },
            ],
          },
        ],
      },
      {
        id: 'external-providers',
        title: 'External SMS Providers',
        cards: [
          {
            id: 'twilio',
            logoType: 'twilio',
            title: 'Twilio Integration',
            description:
              'Twilio is an external SMS provider that can enable you to receive and send messages to your customers.',
            button: {
              label: 'Connect',
              action: 'connect-twilio',
              style: 'primary',
            },
          },
        ],
      },
    ],
  };

  handleAction(action: string): void {
    console.log('Action clicked:', action);
  }

  trackBySection(index: number, section: SmsSection): string {
    return section.id;
  }

  trackByCard(index: number, card: SmsCard): string {
    return card.id;
  }

  trackByRow(index: number, row: SmsRow): string {
    return `${row.type}-${index}`;
  }
}