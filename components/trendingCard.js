import { BlurView } from "expo-blur";
import { TouchableOpacity, View, Text, Image, StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES } from "../constants";

const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
    const RecipeCard = () => {
        return (
            <BlurView tint="dark" style={styles.recipeCardContainer}>
                <View style={{ flex: 1 }}>
                    <View 
                        style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text
                            style={{
                                width: '70%',
                                color: COLORS.white,
                                ...FONTS.h3,
                                fontSize: 18
                            }}
                        >
                            {recipeItem.name}
                        </Text>
                        <Image 
                            source={recipeItem.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                            style={{
                                height: 20,
                                width: 20,
                                marginRight: SIZES.base,
                                tintColor: COLORS.darkGreen
                            }}
                        />
                    </View>
                    <Text 
                        style={{
                            color: COLORS.lightGray,
                            ...FONTS.body4
                        }}
                    >
                        {recipeItem.duration} | {recipeItem.serving} Serving
                    </Text>
                </View>
            </BlurView>
        )
    }
    return (
        <TouchableOpacity
            style={{
                height: 280,
                width: 200,
                marginTop: SIZES.radius,
                marginRight: 20,
                borderRadius: SIZES.radius,
                ...containerStyle
            }}
            onPress={onPress}
        >
            <Image 
                source={recipeItem.image}
                resizeMode="cover"
                style={{
                    width: 200,
                    height: 280,
                    borderRadius: SIZES.radius
                }}
            />
            <View
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 15,
                    paddingHorizontal: SIZES.radius,
                    paddingVertical: 5,
                    backgroundColor: COLORS.transparentGray,
                    borderRadius: SIZES.radius
                }}
            >
                <Text style={{ color: COLORS.white, ...FONTS.h4}}>{recipeItem.category}</Text>
            </View>
            <RecipeCard recipeItem={recipeItem} />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    recipeCardContainer: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        height: 100,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.base,
        borderRadius: SIZES.radius
    }
})
 
export default TrendingCard;