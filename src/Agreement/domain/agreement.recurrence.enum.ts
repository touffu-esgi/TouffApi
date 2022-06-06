export enum AgreementRecurrenceEnum {
  None = 'None',
  Daily = 'Daily',
  Weekly = 'Weekly',
  Monthly = 'Monthly',
}

export function getAgreementRecurrenceEnumFromString(
  str: string,
): AgreementRecurrenceEnum {
  return AgreementRecurrenceEnum[str];
}
