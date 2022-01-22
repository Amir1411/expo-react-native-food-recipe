import { BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import { Viewers } from "../../components";
import { COLORS, FONTS, icons, SIZES } from "../../constants";

const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {
    const [selectedRecipe, setSelectedRecipe] = useState(null)

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        let { recipe } = route.params;
        setSelectedRecipe(recipe);
    }, [])

    const renderHeaderBar = () => {
        return (
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 90,
                    flexDirection: "row",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingHorizontal: SIZES.padding,
                    paddingBottom: 10
                }}
            >
                {/* Scrren Overlay */}
                <Animated.View 
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: COLORS.black,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
                            outputRange: [0, 1]
                        })
                    }}
                />

                {/* Header Bar Title */}
                <Animated.View 
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        alignItems: "center",
                        justifyContent: "flex-end",
                        paddingBottom: 10,
                        opacity: scrollY.interpolate({
                            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                            outputRange: [0, 1]
                        }),
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                                    outputRange: [50, 0],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <Text style={{
                        color: COLORS.lightGray2,
                        ...FONTS.body4
                    }}>Recipe by:</Text>
                    <Text style={{
                        color: COLORS.white2,
                        ...FONTS.h3
                    }}>{selectedRecipe?.author?.name}</Text>
                </Animated.View>

                {/* Back Button */}
                <TouchableOpacity
                    style={{
                        height: 35,
                        width: 35,
                        borderRadius: 18,
                        backgroundColor: COLORS.transparentBlack5,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: COLORS.lightGray,
                        borderWidth: 1
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image 
                        source={icons.back}
                        style={{
                            height: 15,
                            width: 15,
                            tintColor: COLORS.lightGray
                        }}
                    />
                </TouchableOpacity>

                {/* Bookmark */}
                <TouchableOpacity
                    style={{
                        height: 35,
                        width: 35,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <Image 
                        source={selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
                        style={{
                            height: 30,
                            width: 30,
                            tintColor: COLORS.darkGreen
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderRecipeCardHeader = () => {
        return (
            <View style={{ 
                marginTop: -1000,
                paddingTop: 1000,
                alignItems: 'center', 
                overflow: 'hidden' 
            }}>
                {/* Background Image */}
                <Animated.Image 
                    source={selectedRecipe?.image}
                    resizeMode='contain'
                    style={{
                        height: HEADER_HEIGHT,
                        width: '200%',
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
                                })
                            },
                            {
                                scale: scrollY.interpolate({
                                    inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                                    outputRange: [2, 1, 0.75]
                                })
                            }
                        ]
                    }}
                />
                {/* Recipe creator card */}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 10,
                        left: 30,
                        right: 30,
                        height: 80,
                        transform: [
                            {
                                translateY: scrollY.interpolate({
                                    inputRange: [0, 170, 250],
                                    outputRange: [0, 0, 100],
                                    extrapolate: 'clamp'
                                })
                            }
                        ]
                    }}
                >
                    <BlurView 
                        style={{
                            flex: 1,
                            borderRadius: SIZES.radius,
                        }}
                        tint="dark"
                    >
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            {/* Profile Photo */}
                            <View style={{
                                width: 40,
                                height: 40,
                                marginLeft: 20
                            }}>
                                <Image 
                                    source={selectedRecipe?.author?.profilePic}
                                    style={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: 20
                                    }}
                                />
                            </View>
                            {/* Labels */}
                            <View style={{
                                flex: 1,
                                marginHorizontal: 20
                            }}>
                                <Text style={{
                                    color: COLORS.lightGray2,
                                    ...FONTS.body4
                                }}>Recipe by:</Text>
                                <Text style={{
                                    color: COLORS.white2,
                                    ...FONTS.h3
                                }}>{selectedRecipe?.author?.name}</Text>
                            </View>
                            {/* Button */}
                            <TouchableOpacity
                                style={{
                                    width: 30,
                                    height: 30,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginRight: 20,
                                    borderRadius: 5,
                                    borderWidth: 1,
                                    borderColor: COLORS.lightGreen1
                                }}
                                onPress={() => console.log('View Profile')}
                            >
                                <Image 
                                    source={icons.rightArrow}
                                    style={{
                                        width: 15,
                                        height: 15,
                                        tintColor: COLORS.lightGreen1
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                    </BlurView>
                </Animated.View>
            </View>
        )
    }

    const renderRecipeInfo = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 130,
                    width: SIZES.width,
                    paddingHorizontal: 30,
                    paddingVertical: 20,
                    alignItems: 'center'
                }}
            >
                {/* Recipe */}
                <View style={{
                    flex: 1.5,
                    justifyContent: 'center'
                }}>
                    <Text style={{ ...FONTS.h2 }}>{selectedRecipe?.name}</Text>
                    <Text style={{
                        marginTop: 5,
                        color: COLORS.lightGray2,
                        ...FONTS.body4
                    }}>
                        {selectedRecipe?.duration} | {selectedRecipe?.serving} Serving
                    </Text>
                </View>

                {/* Viewers */}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Viewers viewerList={selectedRecipe?.viewers} />
                </View>
            </View>
        )
    }

    const renderIncredientHeader = () => {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: 30,
                    marginTop: SIZES.radius,
                    marginBottom: SIZES.padding
                }}
            >
                <Text style={{ ...FONTS.h3, flex: 1 }}>Ingredients</Text>
                <Text style={{ ...FONTS.body4, color: COLORS.lightGray2 }}>
                    {selectedRecipe?.ingredients.length} items
                </Text>
            </View>
        )
    }

    return ( 
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Animated.FlatList
                data={selectedRecipe?.ingredients}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {/* Header */}
                        {renderRecipeCardHeader()}

                        {/* Info */}
                        {renderRecipeInfo()}

                        {/* Ingredient Title */}
                        {renderIncredientHeader()}
                    </View>
                }
                scrollEventThrottle={16}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { y: scrollY } } }
                ], { useNativeDriver: true })}
                renderItem={({ item }) => (
                    <View style={{
                        flexDirection: 'row',
                        paddingHorizontal: 30,
                        marginVertical: 5
                    }}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 50,
                            width: 50,
                            borderRadius: 5,
                            backgroundColor: COLORS.lightGray
                        }}>
                            <Image 
                                source={item.icon}
                                style={{
                                    width: 40,
                                    height: 40
                                }}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            paddingHorizontal: 20,
                            justifyContent: 'center'
                        }}>
                            <Text style={{...FONTS.body3}}>
                                {item.description}
                            </Text>
                        </View>
                        <View style={{
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <Text style={{...FONTS.body3}}>
                                {item.quantity}
                            </Text>
                        </View>
                    </View>
                )}
                ListFooterComponent={
                    <View style={{ marginBottom: 250 }} />
                }
            />
            {/* Header Bar */}
            {renderHeaderBar()}
        </View>
    );
}
 
export default Recipe;