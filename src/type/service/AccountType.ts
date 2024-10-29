export interface GoogleProviderInfo {
    email: string;
    profileImageUrl: string;
}
export interface AccountType {
    deviceId: string;
    accountName: string;
    age: number;
    createAt: string;
    email: string;
    gender: 'MALE' | 'FEMALE' | 'NONBINARY';
    isEnabled: boolean;
    nickname: string;
    profileImage: string;
    providerId: string;
    username: string;
    googleProviderInfo: GoogleProviderInfo;
    likeCount: number;
    roles: Array<
        | 'ROLE_MASTER'
        | 'ROLE_USER'
        | 'ROLE_WRITER'
        | 'ROLE_GUEST'
        | 'ROLE_BOT'
        | 'ROLE_APP'
    >;
}
