import { useState } from 'react';
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

export default function FAQScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

    const faqs = [
        {
            id: '1',
            question: t('howToRegister'),
            answer: t('howToRegisterAnswer'),
        },
        {
            id: '2',
            question: t('whatDocumentsNeeded'),
            answer: t('whatDocumentsNeededAnswer'),
        },
        {
            id: '3',
            question: t('howLongApproval'),
            answer: t('howLongApprovalAnswer'),
        },
        {
            id: '4',
            question: t('canApplyMultiple'),
            answer: t('canApplyMultipleAnswer'),
        },
        {
            id: '5',
            question: t('howToTrackApplication'),
            answer: t('howToTrackApplicationAnswer'),
        },
    ];

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
                <Text style={styles.headerTitle}>{t('faq')}</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>{t('frequentlyAsked')}</Text>
                <Text style={styles.sectionDescription}>
                    {t('frequentlyAskedDesc')}
                </Text>

                {faqs.map((faq) => (
                    <TouchableOpacity
                        key={faq.id}
                        style={styles.faqCard}
                        onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        activeOpacity={0.7}
                    >
                        <View style={styles.faqHeader}>
                            <Text style={styles.faqQuestion}>{faq.question}</Text>
                            <Ionicons 
                                name={expandedFaq === faq.id ? 'chevron-up' : 'chevron-down'} 
                                size={20} 
                                color="#C03825" 
                            />
                        </View>
                        {expandedFaq === faq.id && (
                            <Text style={styles.faqAnswer}>{faq.answer}</Text>
                        )}
                    </TouchableOpacity>
                ))}
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
        fontSize: 20,
        fontFamily: Fonts.bold,
        color: '#333',
    },
    sectionDescription: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        marginBottom: 16,
        lineHeight: 20,
    },
    faqCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    faqHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    faqQuestion: {
        flex: 1,
        fontSize: 15,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginRight: 12,
    },
    faqAnswer: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        marginTop: 12,
        lineHeight: 20,
    },
});
