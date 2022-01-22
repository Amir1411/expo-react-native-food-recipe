import { FlatList, Image, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CategoryCard, TrendingCard } from "../../components";
import { COLORS, dummyData, SIZES, FONTS, images, icons } from "../../constants";

const Home = ({ navigation }) => {

    const renderHeader = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginHorizontal: SIZES.padding,
                    alignItems: "center",
                    height: 80
                }}
            >
                <View style={{ flex: 1 }}>
                    <Text style={{ ...FONTS.h2, color: COLORS.darkGreen }}>Hello Amir,</Text>
                    <Text style={{ ...FONTS.body3, color: COLORS.gray, marginTop: 3 }}>What you want to cook today?</Text>
                </View>
                <TouchableOpacity onPress={() => console.log('profile')}>
                    <Image
                        source={images.profile}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20
                        }}
                    />
                </TouchableOpacity>
            </View>
        )
    }

    const renderSearchBar = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    height: 50,
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                    paddingHorizontal: SIZES.radius,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGray
                }}
            >
                <Image 
                    source={icons.search}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: COLORS.gray
                    }}
                />
                <TextInput 
                    style={{
                        width: '90%',
                        marginLeft: SIZES.radius,
                        ...FONTS.body3
                    }}
                    placeholder="Search Recipes"
                    placeholderTextColor={COLORS.gray}
                />
            </View>
        )
    }

    const renderSeeRecipeCard = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen
                }}
            >
                <Image 
                    source={images.recipe}
                    style={{
                        width: 80,
                        height: 80
                    }}
                />
                <View style={{ flex: 1, paddingVertical: SIZES.radius, paddingHorizontal: SIZES.padding }}>
                    <Text style={{ ...FONTS.body4, width: '80%' }}>
                        You have 12 recipes that you havn't tried yet.
                    </Text>
                    <TouchableOpacity
                        style={{ marginTop: 10}}
                        onPress={() => console.log('See Recipe')}
                    >
                        <Text style={{ ...FONTS.h4, color: COLORS.darkGreen, textDecorationLine: 'underline' }}>See Recipes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderTrendingSection = () => {
        return (
            <View style={{ marginTop: SIZES.padding}}>
                <Text style={{ ...FONTS.h2, marginHorizontal: SIZES.padding }}>Trending Recipe</Text>
                <FlatList 
                    data={dummyData.trendingRecipes}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <TrendingCard
                                containerStyle={{
                                    marginLeft: index === 0 ? SIZES.padding : 0
                                }}
                                recipeItem={item}
                                onPress={() => navigation.navigate("Recipe", { recipe: item })}
                            />
                        )
                    }}
                />
            </View>
        )
    }

    const renderCategoryHeader = () => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginHorizontal: SIZES.padding,
                    marginTop: 20
                }}
            >
                <Text style={{ ...FONTS.h2, flex: 1 }}>Categories</Text>
                <TouchableOpacity>
                    <Text style={{ ...FONTS.body4, color: COLORS.gray }}>View All</Text>
                </TouchableOpacity>
            </View>
        )
    }

    return ( 
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <FlatList 
                data={dummyData.categories}
                keyExtractor={(item) => `${item.id}`}
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        {renderHeader()}
                        {renderSearchBar()}
                        {renderSeeRecipeCard()}
                        {renderTrendingSection()}
                        {renderCategoryHeader()}
                    </View>
                }
                renderItem={({ item }) => {
                    return (
                        <CategoryCard 
                            containerStyle={{
                                marginHorizontal: SIZES.padding
                            }}
                            categoryItem={item}
                            onPress={() => navigation.navigate("Recipe", { recipe: item })}
                        />
                    )
                }}
                ListFooterComponent={
                    <View 
                        style={{
                            marginBottom: 100
                        }}
                    />
                }
            />
        </SafeAreaView>
    );
}
 
export default Home;