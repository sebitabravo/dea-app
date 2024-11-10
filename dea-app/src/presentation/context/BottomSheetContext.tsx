import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';
import { Keyboard, Text } from 'react-native';

interface BottomSheetContextProps {
    openBottomSheet: (content: ReactNode, customSnapPoints?: string[]) => void;
    closeBottomSheet: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextProps | undefined>(undefined);

interface BottomSheetProviderProps {
    children: ReactNode;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children }) => {
    const { colorScheme } = useColorScheme();
    const sheetRef = useRef<BottomSheet>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [bottomSheetContent, setBottomSheetContent] = useState<ReactNode>(<Text>Bottom Sheet</Text>);
    const [snapPoints, setSnapPoints] = useState<string[]>(["90%"]);

    const openBottomSheet = (content: ReactNode, customSnapPoints?: string[]) => {
        setBottomSheetContent(content);
        setSnapPoints(customSnapPoints || ["70%"]);
        setIsOpen(true);
        sheetRef.current?.snapToIndex(0);
    };

    const closeBottomSheet = () => {
        setIsOpen(false);
    };

    const renderBackdrop = (props: any) => (
        <BottomSheetBackdrop
            {...props}
            onPress={Keyboard.dismiss}
            disappearsOnIndex={-1}
            opacity={0.8}
        />
    );

    return (
        <BottomSheetContext.Provider value={{ openBottomSheet, closeBottomSheet }}>
            {children}
            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                onClose={closeBottomSheet}
                backdropComponent={renderBackdrop}
                animationConfigs={{
                    damping: 20,
                    stiffness: 210,
                }}
                index={isOpen ? 0 : -1}
                handleIndicatorStyle={{ backgroundColor: '#ccc' }}
                enableHandlePanningGesture={true}
                keyboardBehavior="interactive"
                accessibilityLabel="Bottom Sheet"
                accessibilityRole="menu"
                handleStyle={{
                    backgroundColor: colorScheme === 'dark' ? '#232323' : 'white',
                    borderTopLeftRadius: 14,
                    borderTopRightRadius: 14,
                }}
            >
                <BottomSheetView
                    style={{ backgroundColor: colorScheme === 'dark' ? '#232323' : 'white', height: '100%' }}
                >
                    {bottomSheetContent}
                </BottomSheetView>
            </BottomSheet>
        </BottomSheetContext.Provider>
    );
};

export const useBottomSheet = (): BottomSheetContextProps => {
    const context = useContext(BottomSheetContext);
    if (!context) {
        throw new Error('useBottomSheet must be used within a BottomSheetProvider');
    }
    return context;
};
