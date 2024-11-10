import * as Haptics from 'expo-haptics';
import { useColorScheme } from "nativewind";
import React, { useCallback, useRef, useState } from "react";
import {
    FlatList,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

// Icons
import DownIcon from '@/app/assets/icons/MingcuteDownLine.svg';

export function SelectUI({
    data,
    onChange,
    color = 'default',
    radius = 'lg',
    label,
    size,
    haptics = 'none',
}) {
    const { colorScheme } = useColorScheme();
    const [expanded, setExpanded] = useState(false);
    const [value, setValue] = useState("");
    const [top, setTop] = useState(0);
    const buttonRef = useRef(null);

    const toggleExpanded = useCallback(() => setExpanded(!expanded), [expanded]);

    const onSelect = useCallback((item) => {
        onChange(item);
        setValue(item.name);
        setExpanded(false);
        switch (haptics) {
            case 'soft':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
                break
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
                break
            case 'medium':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
                break
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
                break
            case 'rigid':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
                break
            default:
                break
        }
    }, [onChange]);

    const measureView = () => {
        if (buttonRef.current) {
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                const topOffset = py;
                const heightOfComponent = height;
                const finalValue =
                    topOffset + heightOfComponent + (Platform.OS === "android" ? -32 : 3);
                setTop(finalValue);
            });
        }
    };

    // Animación de rotación para el DownIcon
    const rotation = useSharedValue(expanded ? 180 : 0);

    React.useEffect(() => {
        rotation.value = withTiming(expanded ? 180 : 0, { duration: 200 });
    }, [expanded]);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }]
        };
    });

    // Animación del modal (opacidad y traslación)
    const modalOpacity = useSharedValue(expanded ? 1 : 0);
    const modalTranslateY = useSharedValue(expanded ? 0 : - 50);

    React.useEffect(() => {
        modalOpacity.value = withTiming(expanded ? 1 : 0, { duration: 100 });
        modalTranslateY.value = withTiming(expanded ? 0 : -10, { duration: 200 });
    }, [expanded]);

    const modalAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: modalOpacity.value,
            transform: [{ translateY: modalTranslateY.value }],
        };
    });

    return (
        <View
            ref={buttonRef}
            onLayout={measureView}
            className='flex relative py-2'>
            <Pressable
                className=
                {`h-[60px] flex-row w-[90%] justify-between items-center px-5 
                ${color === 'default' && colorScheme === 'light' ? 'bg-myGray6' : 'bg-myLila'}   
                ${radius === 'full' && 'rounded-full'}
                ${radius === 'lg' && 'rounded-2xl'}
                ${radius === 'md' && 'rounded-xl'}
                ${radius === 'sm' && 'rounded-md'}
                ${radius === 'none' && 'rounded-none'}
                `}
                onPress={toggleExpanded}
            >
                <Text
                    className={`
                        ${color === 'default' && colorScheme === 'light' ? 'text-white' : 'text-black'}
                        text-semibold text-[15px]
                            `}
                >{value || label}</Text>
                <Animated.View style={[animatedStyle]}>
                    <DownIcon
                        height={20}
                        width={20}
                        color={colorScheme === 'light' ? 'white' : 'black'}
                    />
                </Animated.View>
            </Pressable>

            {expanded && (
                <Modal visible={expanded} transparent>
                    <TouchableWithoutFeedback onPress={() => setExpanded(false)}>
                        <View style={styles.backdrop}>
                            <Animated.View
                                className={`
                                     ${color === 'default' && colorScheme === 'light' ? 'bg-myGray6' : 'bg-myLila'}   
                                    ${radius === 'full' && 'rounded-3xl'}
                                    ${radius === 'lg' && 'rounded-2xl'}
                                    ${radius === 'md' && 'rounded-xl'}
                                    ${radius === 'sm' && 'rounded-md'}
                                    ${radius === 'none' && 'rounded-none'}
                                        `}
                                style={[styles.options, { top }, modalAnimatedStyle]}>
                                <FlatList
                                    keyExtractor={(item) => item.id}
                                    data={data}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            activeOpacity={0.8}
                                            style={styles.optionItem}
                                            onPress={() => onSelect(item)}
                                        >
                                            <Text
                                                className={`
                                                 ${color === 'default' && colorScheme === 'light' ? 'text-white text-[16px] px-2' : 'text-black'}   
                                                    `}
                                            >{item.name}</Text>
                                        </TouchableOpacity>
                                    )}
                                    ItemSeparatorComponent={() => (
                                        <View style={styles.separator} />
                                    )}
                                />
                            </Animated.View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    backdrop: {
        padding: 10,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
    optionItem: {
        position: "relative",
        height: 40,
        justifyContent: "center",
    },
    separator: {
        height: 4,
    },
    options: {
        top: 0,
        position: "absolute",
        width: "95%",
        padding: 10,
        maxHeight: 250,
    },
});
