import {
  ChannelTypeEnum,
  IAttachmentOptions,
} from '../template/template.interface';
import { CheckIntegrationResponseEnum } from './provider.enum';

export interface IProvider {
  id: string;
  channelType: ChannelTypeEnum;
}

export interface IEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
  text?: string;
  attachments?: IAttachmentOptions[];
}

export interface ISmsOptions {
  to: string;
  content: string;
  from?: string;
  attachments?: IAttachmentOptions[];
}
export interface IPushOptions {
  target: string[];
  title: string;
  content: string;
  payload: object;
  overrides?: {
    tag?: string;
    body?: string;
    icon?: string;
    badge?: string;
    color?: string;
    sound?: string;
    title?: string;
    bodyLocKey?: string;
    bodyLocArgs?: string;
    clickAction?: string;
    titleLocKey?: string;
    titleLocArgs?: string;
  };
}

export interface IChatOptions {
  webhookUrl: string;
  content: string;
}

export interface ISendMessageSuccessResponse {
  id?: string;
  ids?: string[];
  date?: string;
}

export enum EmailEventStatusEnum {
  OPENED = 'opened',
  DELIVERED = 'delivered',
  BOUNCED = 'bounced',
  DROPPED = 'dropped',
  CLICKED = 'clicked',
}

export interface IEventBody {
  status: string;
  date: string;
  externalId?: string;
  attempts?: number;
  response?: string;
  // Contains the raw content from the provider webhook
  row?: string;
}

export interface IEmailEventBody extends IEventBody {
  status: EmailEventStatusEnum;
}

export interface IEmailProvider extends IProvider {
  channelType: ChannelTypeEnum.EMAIL;

  sendMessage(options: IEmailOptions): Promise<ISendMessageSuccessResponse>;

  getMessageId?: (body: any) => string[];

  parseEventBody?: (
    body: any,
    identifier: string
  ) => IEmailEventBody | undefined;

  checkIntegration(options: IEmailOptions): Promise<ICheckIntegrationResponse>;
}

export interface ISmsProvider extends IProvider {
  sendMessage(options: ISmsOptions): Promise<ISendMessageSuccessResponse>;

  channelType: ChannelTypeEnum.SMS;
}

export interface IChatProvider extends IProvider {
  sendMessage(options: IChatOptions): Promise<ISendMessageSuccessResponse>;
  channelType: ChannelTypeEnum.CHAT;
}

export interface IPushProvider extends IProvider {
  sendMessage(options: IPushOptions): Promise<ISendMessageSuccessResponse>;

  channelType: ChannelTypeEnum.PUSH;
}

export interface ICheckIntegrationResponse {
  success: boolean;
  message: string;
  code: CheckIntegrationResponseEnum;
}
