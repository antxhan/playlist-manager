import RecommendView from "../../components/RecommendView/RecommendView";
import SearchBar from "../../components/SearchBar/SearchBar";
import Layout from "../../Layout";

export default function SearchSkeleton() {
  return (
    <Layout>
      <header className="page-header">
        <SearchBar q={""} />
      </header>
      <main>
        <RecommendView />
      </main>
    </Layout>
  );
}
