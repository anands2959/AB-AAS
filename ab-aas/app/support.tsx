import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    Linking,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';

export default function SupportScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const [selectedTab, setSelectedTab] = useState<'contact' | 'faq' | 'helpdesk'>('contact');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const contactOptions = [
        {
            id: 'phone',
            title: t('callUs'),
            subtitle: '+91 1800-XXX-XXXX',
            icon: 'call',
            color: '#4CAF50',
            action: () => Linking.openURL('tel:1800XXXXXXX'),
        },
        {
            id: 'whatsapp',
            title: t('whatsappSupport'),
            subtitle: '+91 98765-XXXXX',
            icon: 'logo-whatsapp',
            color: '#25D366',
            action: () => Linking.openURL('https://wa.me/919876XXXXXX'),
        },
        {
            id: 'email',
            title: t('emailUs'),
            subtitle: 'support@abaas.org',
            icon: 'mail',
            color: '#2196F3',
            action: () => Linking.openURL('mailto:support@abaas.org'),
        },
        {
            id: 'location',
            title: t('visitOffice'),
            subtitle: t('viewLocation'),
            icon: 'location',
            color: '#FF5722',
            action: () => {
                // Open maps with organization location
                Linking.openURL('https://maps.google.com');
            },
        },
    ];

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

    const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

    const handleSubmitQuery = () => {
        if (!name || !email || !message) {
            Alert.alert(t('error'), t('fillAllFields'));
            return;
        }

        // Here you would typically send the query to your backend
        Alert.alert(
            t('success'),
            t('querySubmitted'),
            [
                {
                    text: t('ok'),
                    onPress: () => {
                        setName('');
                        setEmail('');
                        setMessage('');
                    },
                },
            ]
        );
    };

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
                <Text style={styles.headerTitle}>{t('support')}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Tabs */}
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'contact' && styles.tabActive]}
                    onPress={() => setSelectedTab('contact')}
                >
                    <Ionicons 
                        name="call-outline" 
                        size={20} 
                        color={selectedTab === 'contact' ? '#C03825' : '#999'} 
                    />
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'contact' && styles.tabTextActive,
                    ]}>
                        {t('contact')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'faq' && styles.tabActive]}
                    onPress={() => setSelectedTab('faq')}
                >
                    <Ionicons 
                        name="help-circle-outline" 
                        size={20} 
                        color={selectedTab === 'faq' ? '#C03825' : '#999'} 
                    />
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'faq' && styles.tabTextActive,
                    ]}>
                        {t('faq')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, selectedTab === 'helpdesk' && styles.tabActive]}
                    onPress={() => setSelectedTab('helpdesk')}
                >
                    <Ionicons 
                        name="chatbubbles-outline" 
                        size={20} 
                        color={selectedTab === 'helpdesk' ? '#C03825' : '#999'} 
                    />
                    <Text style={[
                        styles.tabText,
                        selectedTab === 'helpdesk' && styles.tabTextActive,
                    ]}>
                        {t('helpdesk')}
                    </Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {/* Contact Tab */}
                {selectedTab === 'contact' && (
                    <View>
                        <Text style={styles.sectionTitle}>{t('getInTouch')}</Text>
                        <Text style={styles.sectionDescription}>
                            {t('getInTouchDesc')}
                        </Text>

                        {contactOptions.map((option) => (
                            <TouchableOpacity
                                key={option.id}
                                style={styles.contactCard}
                                onPress={option.action}
                                activeOpacity={0.7}
                            >
                                <View style={[styles.contactIcon, { backgroundColor: `${option.color}15` }]}>
                                    <Ionicons name={option.icon as any} size={28} color={option.color} />
                                </View>
                                <View style={styles.contactContent}>
                                    <Text style={styles.contactTitle}>{option.title}</Text>
                                    <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </TouchableOpacity>
                        ))}

                        <View style={styles.officeHours}>
                            <Ionicons name="time-outline" size={24} color="#C03825" />
                            <View style={styles.officeHoursContent}>
                                <Text style={styles.officeHoursTitle}>{t('officeHours')}</Text>
                                <Text style={styles.officeHoursText}>
                                    {t('mondayToFriday')}: 9:00 AM - 6:00 PM
                                </Text>
                                <Text style={styles.officeHoursText}>
                                    {t('saturday')}: 9:00 AM - 1:00 PM
                                </Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* FAQ Tab */}
                {selectedTab === 'faq' && (
                    <View>
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
                    </View>
                )}

                {/* Helpdesk Tab */}
                {selectedTab === 'helpdesk' && (
                    <View>
                        <Text style={styles.sectionTitle}>{t('submitQuery')}</Text>
                        <Text style={styles.sectionDescription}>
                            {t('submitQueryDesc')}
                        </Text>

                        <View style={styles.form}>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t('fullName')}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('enterName')}
                                    value={name}
                                    onChangeText={setName}
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t('email')}</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder={t('enterEmail')}
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>{t('yourMessage')}</Text>
                                <TextInput
                                    style={[styles.input, styles.textArea]}
                                    placeholder={t('typeYourMessage')}
                                    value={message}
                                    onChangeText={setMessage}
                                    multiline
                                    numberOfLines={5}
                                    textAlignVertical="top"
                                    placeholderTextColor="#999"
                                />
                            </View>

                            <TouchableOpacity 
                                style={styles.submitButton}
                                onPress={handleSubmitQuery}
                            >
                                <Text style={styles.submitButtonText}>{t('submitQuery')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
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
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    tab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        gap: 6,
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    tabActive: {
        borderBottomColor: '#C03825',
    },
    tabText: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#999',
    },
    tabTextActive: {
        color: '#C03825',
        fontFamily: Fonts.semiBold,
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
        marginBottom: 8,
    },
    sectionDescription: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        marginBottom: 20,
        lineHeight: 20,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
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
    contactIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    contactContent: {
        flex: 1,
    },
    contactTitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginBottom: 4,
    },
    contactSubtitle: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
    },
    officeHours: {
        flexDirection: 'row',
        backgroundColor: '#FFF5F3',
        borderRadius: 12,
        padding: 16,
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#FFE5E0',
    },
    officeHoursContent: {
        flex: 1,
        marginLeft: 12,
    },
    officeHoursTitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#C03825',
        marginBottom: 8,
    },
    officeHoursText: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#666',
        marginBottom: 4,
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
    form: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    inputContainer: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: Fonts.medium,
        color: '#333',
        marginBottom: 8,
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 12,
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#333',
        borderWidth: 1,
        borderColor: '#E0E0E0',
    },
    textArea: {
        minHeight: 120,
        paddingTop: 12,
    },
    submitButton: {
        backgroundColor: '#C03825',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 8,
    },
    submitButtonText: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#fff',
    },
});
