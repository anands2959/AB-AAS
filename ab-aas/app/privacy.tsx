import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyPolicyScreen() {
    const router = useRouter();
    const { t } = useLanguage();

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => router.back()}
                >
                    <Ionicons name="chevron-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('privacy')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>{t('privacyPolicyTitle')}</Text>
                <Text style={styles.lastUpdated}>{t('lastUpdated')}</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('infoWeCollect')}</Text>
                    <Text style={styles.paragraph}>{t('infoWeCollectDesc')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoFullName')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoPhone')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoDisability')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoAddress')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoAadhar')}</Text>
                    <Text style={styles.bulletPoint}>{t('infoIncome')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('howWeUse')}</Text>
                    <Text style={styles.paragraph}>{t('howWeUseDesc')}</Text>
                    <Text style={styles.bulletPoint}>{t('useProcess')}</Text>
                    <Text style={styles.bulletPoint}>{t('useVerify')}</Text>
                    <Text style={styles.bulletPoint}>{t('useCommunicate')}</Text>
                    <Text style={styles.bulletPoint}>{t('useSupport')}</Text>
                    <Text style={styles.bulletPoint}>{t('useImprove')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('infoSharing')}</Text>
                    <Text style={styles.paragraph}>{t('infoSharingDesc')}</Text>
                    <Text style={styles.bulletPoint}>{t('shareGovt')}</Text>
                    <Text style={styles.bulletPoint}>{t('shareProviders')}</Text>
                    <Text style={styles.bulletPoint}>{t('shareLegal')}</Text>
                    <Text style={styles.paragraph}>{t('noSell')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('dataSecurity')}</Text>
                    <Text style={styles.paragraph}>{t('dataSecurityDesc')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('yourRights')}</Text>
                    <Text style={styles.paragraph}>{t('yourRightsDesc')}</Text>
                    <Text style={styles.bulletPoint}>{t('rightAccess')}</Text>
                    <Text style={styles.bulletPoint}>{t('rightCorrect')}</Text>
                    <Text style={styles.bulletPoint}>{t('rightDelete')}</Text>
                    <Text style={styles.bulletPoint}>{t('rightWithdraw')}</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionHeading}>{t('contactUs')}</Text>
                    <Text style={styles.paragraph}>{t('contactUsDesc')}</Text>
                    <Text style={styles.contactInfo}>{t('contactPhone')}</Text>
                    <Text style={styles.contactInfo}>{t('contactEmail')}</Text>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>{t('agreementText')}</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: '#C03825',
    },
    placeholder: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 24,
        fontFamily: Fonts.bold,
        color: '#333',
        marginBottom: 8,
    },
    lastUpdated: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#999',
        marginBottom: 24,
    },
    section: {
        marginBottom: 24,
    },
    sectionHeading: {
        fontSize: 18,
        fontFamily: Fonts.semiBold,
        color: '#C03825',
        marginBottom: 12,
    },
    paragraph: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        lineHeight: 22,
        marginBottom: 8,
    },
    bulletPoint: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        lineHeight: 24,
        paddingLeft: 8,
    },
    contactInfo: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#C03825',
        lineHeight: 24,
    },
    footer: {
        backgroundColor: '#FFF5F3',
        borderRadius: 12,
        padding: 16,
        marginTop: 16,
        marginBottom: 32,
        borderWidth: 1,
        borderColor: '#FFE5E0',
    },
    footerText: {
        fontSize: 13,
        fontFamily: Fonts.medium,
        color: '#C03825',
        textAlign: 'center',
        lineHeight: 20,
    },
});
