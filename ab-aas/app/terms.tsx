import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsScreen() {
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
                <Text style={styles.headerTitle}>{t('termsOfUseTitle')}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Content */}
            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.lastUpdated}>{t('lastUpdated')}</Text>

                <Text style={styles.sectionTitle}>{t('termsAcceptance')}</Text>
                <Text style={styles.paragraph}>{t('termsAcceptanceDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('termsEligibility')}</Text>
                <Text style={styles.paragraph}>{t('termsEligibilityDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsAge18')}</Text>
                <Text style={styles.bulletPoint}>{t('termsIndianResident')}</Text>
                <Text style={styles.bulletPoint}>{t('termsDisabilityCertificate')}</Text>
                <Text style={styles.bulletPoint}>{t('termsAccurateInfo')}</Text>

                <Text style={styles.sectionTitle}>{t('termsUserAccount')}</Text>
                <Text style={styles.paragraph}>{t('termsUserAccountDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsAccountSecurity')}</Text>
                <Text style={styles.bulletPoint}>{t('termsAccountActivity')}</Text>
                <Text style={styles.bulletPoint}>{t('termsAccountNotification')}</Text>

                <Text style={styles.sectionTitle}>{t('termsServices')}</Text>
                <Text style={styles.paragraph}>{t('termsServicesDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsServicesBenefit')}</Text>
                <Text style={styles.bulletPoint}>{t('termsServicesTracking')}</Text>
                <Text style={styles.bulletPoint}>{t('termsServicesSupport')}</Text>
                <Text style={styles.bulletPoint}>{t('termsServicesNotifications')}</Text>

                <Text style={styles.sectionTitle}>{t('termsUserResponsibilities')}</Text>
                <Text style={styles.paragraph}>{t('termsUserResponsibilitiesDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsResponsibilityAccurate')}</Text>
                <Text style={styles.bulletPoint}>{t('termsResponsibilityDocuments')}</Text>
                <Text style={styles.bulletPoint}>{t('termsResponsibilityLawful')}</Text>
                <Text style={styles.bulletPoint}>{t('termsResponsibilityNoMisuse')}</Text>
                <Text style={styles.bulletPoint}>{t('termsResponsibilityNoFraud')}</Text>

                <Text style={styles.sectionTitle}>{t('termsProhibitedActivities')}</Text>
                <Text style={styles.paragraph}>{t('termsProhibitedActivitiesDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsProhibitedFalseInfo')}</Text>
                <Text style={styles.bulletPoint}>{t('termsProhibitedMultipleAccounts')}</Text>
                <Text style={styles.bulletPoint}>{t('termsProhibitedUnauthorized')}</Text>
                <Text style={styles.bulletPoint}>{t('termsProhibitedHarm')}</Text>
                <Text style={styles.bulletPoint}>{t('termsProhibitedViolate')}</Text>

                <Text style={styles.sectionTitle}>{t('termsIntellectualProperty')}</Text>
                <Text style={styles.paragraph}>{t('termsIntellectualPropertyDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('termsDisclaimer')}</Text>
                <Text style={styles.paragraph}>{t('termsDisclaimerDesc')}</Text>
                <Text style={styles.bulletPoint}>{t('termsDisclaimerNoGuarantee')}</Text>
                <Text style={styles.bulletPoint}>{t('termsDisclaimerGovernment')}</Text>
                <Text style={styles.bulletPoint}>{t('termsDisclaimerNoLiability')}</Text>

                <Text style={styles.sectionTitle}>{t('termsLimitation')}</Text>
                <Text style={styles.paragraph}>{t('termsLimitationDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('termsTermination')}</Text>
                <Text style={styles.paragraph}>{t('termsTerminationDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('termsChanges')}</Text>
                <Text style={styles.paragraph}>{t('termsChangesDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('termsGoverningLaw')}</Text>
                <Text style={styles.paragraph}>{t('termsGoverningLawDesc')}</Text>

                <Text style={styles.sectionTitle}>{t('contactUs')}</Text>
                <Text style={styles.paragraph}>{t('contactUsDesc')}</Text>
                <Text style={styles.contactInfo}>{t('contactPhone')}</Text>
                <Text style={styles.contactInfo}>{t('contactEmail')}</Text>

                <View style={styles.agreementBox}>
                    <Text style={styles.agreementText}>{t('termsAgreementText')}</Text>
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
        paddingBottom: 40,
    },
    lastUpdated: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#999',
        marginBottom: 20,
        fontStyle: 'italic',
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.bold,
        color: '#C03825',
        marginTop: 20,
        marginBottom: 10,
    },
    paragraph: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        lineHeight: 22,
        marginBottom: 10,
        textAlign: 'justify',
    },
    bulletPoint: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        lineHeight: 22,
        marginBottom: 8,
        paddingLeft: 10,
        textAlign: 'justify',
    },
    contactInfo: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#C03825',
        marginBottom: 5,
    },
    agreementBox: {
        backgroundColor: '#FFF5F3',
        padding: 15,
        borderRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#C03825',
        marginTop: 20,
    },
    agreementText: {
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: '#C03825',
        lineHeight: 20,
    },
});
