import { Injectable, SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = 'IS_PUBLIC';

export const isPublic = () => SetMetadata(IS_PUBLIC, true);
