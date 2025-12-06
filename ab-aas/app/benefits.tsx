import { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '@/constants/theme';
import { useLanguage } from '@/contexts/LanguageContext';
import SuccessModal from '@/components/SuccessModal';

interface Benefit {
    id: string;
    title: string;
    description: string;
    icon: string;
    category: string;
    eligibility: string;
    amount?: string;
}

export default function BenefitsScreen() {
    const router = useRouter();
    const { t } = useLanguage();
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const handleApplyBenefit = () => {
        setSuccessModalVisible(true);
    };

    const handleCloseSuccessModal = () => {
        setSuccessModalVisible(false);
        router.push('/dashboard');
    };

    const categories = [
        { id: 'all', label: t('allBenefits'), icon: 'apps' },
        { id: 'financial', label: t('financial'), icon: 'cash' },
        { id: 'education', label: t('education'), icon: 'school' },
        { id: 'healthcare', label: t('healthcare'), icon: 'medical' },
        { id: 'employment', label: t('employment'), icon: 'briefcase' },
    ];

    const benefits: Benefit[] = [
        {
            id: '1',
            title: t('disabilityPension'),
            description: t('disabilityPensionDesc'),
            icon: 'wallet',
            category: 'financial',
            eligibility: t('above18Years'),
            amount: '₹1,000 - ₹2,500/month',
        },
        {
            id: '2',
            title: t('educationScholarship'),
            description: t('educationScholarshipDesc'),
            icon: 'school',
            category: 'education',
            eligibility: t('students'),
            amount: '₹5,000 - ₹50,000/year',
        },
        {
            id: '3',
            title: t('freeHealthcare'),
            description: t('freeHealthcareDesc'),
            icon: 'medical',
            category: 'healthcare',
            eligibility: t('allDisabled'),
        },
        {
            id: '4',
            title: t('assistiveDevices'),
            description: t('assistiveDevicesDesc'),
            icon: 'accessibility',
            category: 'healthcare',
            eligibility: t('certificateHolders'),
            amount: t('subsidized'),
        },
        {
            id: '5',
            title: t('skillTraining'),
            description: t('skillTrainingDesc'),
            icon: 'construct',
            category: 'employment',
            eligibility: t('age18to45'),
        },
        {
            id: '6',
            title: t('selfEmployment'),
            description: t('selfEmploymentDesc'),
            icon: 'business',
            category: 'employment',
            eligibility: t('entrepreneurs'),
            amount: '₹50,000 - ₹5,00,000',
        },
        {
            id: '7',
            title: t('transportConcession'),
            description: t('transportConcessionDesc'),
            icon: 'bus',
            category: 'financial',
            eligibility: t('allDisabled'),
            amount: t('upTo75Discount'),
        },
        {
            id: '8',
            title: t('housingScheme'),
            description: t('housingSchemeDesc'),
            icon: 'home',
            category: 'financial',
            eligibility: t('belowPovertyLine'),
            amount: '₹1,20,000 - ₹2,00,000',
        },
    ];

    const filteredBenefits = selectedCategory === 'all' 
        ? benefits 
        : benefits.filter(b => b.category === selectedCategory);

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
                <Text style={styles.headerTitle}>{t('applyBenefits')}</Text>
                <View style={styles.placeholder} />
            </View>

            {/* Category Filter */}
            <View style={styles.categoryWrapper}>
                <ScrollView 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                >
                    {categories.map((category, index) => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryChip,
                                selectedCategory === category.id && styles.categoryChipActive,
                                index === 0 && styles.firstChip,
                            ]}
                            onPress={() => setSelectedCategory(category.id)}
                            activeOpacity={0.7}
                        >
                            <View style={[
                                styles.categoryIconContainer,
                                selectedCategory === category.id && styles.categoryIconContainerActive,
                            ]}>
                                <Ionicons 
                                    name={category.icon as any} 
                                    size={16} 
                                    color={selectedCategory === category.id ? '#fff' : '#C03825'} 
                                />
                            </View>
                            <Text style={[
                                styles.categoryText,
                                selectedCategory === category.id && styles.categoryTextActive,
                            ]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            {/* Benefits List */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Text style={styles.sectionTitle}>
                    {t('availableBenefits')} ({filteredBenefits.length})
                </Text>

                {filteredBenefits.map((benefit) => (
                    <TouchableOpacity
                        key={benefit.id}
                        style={styles.benefitCard}
                        onPress={handleApplyBenefit}
                        activeOpacity={0.7}
                    >
                        <View style={styles.benefitIconContainer}>
                            <Ionicons name={benefit.icon as any} size={28} color="#C03825" />
                        </View>
                        <View style={styles.benefitContent}>
                            <Text style={styles.benefitTitle}>{benefit.title}</Text>
                            <Text style={styles.benefitDescription} numberOfLines={2}>
                                {benefit.description}
                            </Text>
                            <View style={styles.benefitMeta}>
                                <View style={styles.metaItem}>
                                    <Ionicons name="people-outline" size={14} color="#666" />
                                    <Text style={styles.metaText}>{benefit.eligibility}</Text>
                                </View>
                                {benefit.amount && (
                                    <View style={styles.metaItem}>
                                        <Ionicons name="cash-outline" size={14} color="#666" />
                                        <Text style={styles.metaText}>{benefit.amount}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.applyButton}>
                                <Text style={styles.applyButtonText}>{t('applyNow')}</Text>
                                <Ionicons name="arrow-forward" size={16} color="#C03825" />
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {filteredBenefits.length === 0 && (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="document-text-outline" size={80} color="#CCC" />
                        <Text style={styles.emptyTitle}>{t('noBenefits')}</Text>
                        <Text style={styles.emptyMessage}>{t('noBenefitsMessage')}</Text>
                    </View>
                )}
            </ScrollView>

            <SuccessModal
                visible={successModalVisible}
                onClose={handleCloseSuccessModal}
            />
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
    categoryWrapper: {
        backgroundColor: '#fff',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    categoryContainer: {
        paddingHorizontal: 16,
        gap: 8,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: '#F8F8F8',
        borderWidth: 1.5,
        borderColor: '#E0E0E0',
        gap: 6,
    },
    firstChip: {
        marginLeft: 4,
    },
    categoryChipActive: {
        backgroundColor: '#C03825',
        borderColor: '#C03825',
        shadowColor: '#C03825',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 3,
    },
    categoryIconContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    categoryIconContainerActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    categoryText: {
        fontSize: 13,
        fontFamily: Fonts.semiBold,
        color: '#666',
    },
    categoryTextActive: {
        color: '#fff',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginBottom: 16,
    },
    benefitCard: {
        flexDirection: 'row',
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
    benefitIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#FFF5F3',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    benefitContent: {
        flex: 1,
    },
    benefitTitle: {
        fontSize: 16,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginBottom: 4,
    },
    benefitDescription: {
        fontSize: 13,
        fontFamily: Fonts.regular,
        color: '#666',
        lineHeight: 18,
        marginBottom: 8,
    },
    benefitMeta: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 8,
    },
    metaItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    metaText: {
        fontSize: 12,
        fontFamily: Fonts.regular,
        color: '#666',
    },
    applyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 4,
        marginTop: 4,
    },
    applyButtonText: {
        fontSize: 14,
        fontFamily: Fonts.semiBold,
        color: '#C03825',
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyTitle: {
        fontSize: 20,
        fontFamily: Fonts.semiBold,
        color: '#333',
        marginTop: 20,
    },
    emptyMessage: {
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: '#999',
        marginTop: 8,
        textAlign: 'center',
    },
});
